"use client";

import React, { useState, useEffect, useRef } from "react";
import MenuCompleto from "@/components/menu-completo/menu-completo";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoPedido from '@/components/card-conteudo-produto/card-conteudo-pedido';
import NovoPedidoDialog from '@/components/novo-pedido-dialog/novo-pedido.dialog';
import axiosInstance from '@/app/axiosConfig';
import { PaginationControls } from "@/components/pagination-controls/pagination-controls";
import { formatDateTime, formatToWhatsAppLink, formatToGoogleMapsLink, mapStatus } from "@/lib/formatters";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerHistorico } from "@/components/datepicker-historico/datepicker-historico";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { Switch } from "@/components/ui/switch";
import DialogAlertaConexao from "@/components/dialog-alerta-conexao/dialog-alerta-conexao";


const PedidosPage = () => {
    const [filtroStatus, setFiltroStatus] = useState<string>("novo");
    const [pedidoDialogOpen, setPedidoDialogOpen] = useState<boolean>(false);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: startOfDay(new Date(Date.now() - 86400000)), // Ontem
        to: endOfDay(new Date()), // Hoje
    });
    const [isLoading, setIsLoading] = useState(true);
    const [alertaSonoroHabilitado, setAlertaSonoroHabilitado] = useState(false);
    const [conexaoHabilitada, setConexaoHabilitada] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [filaPedidos, setFilaPedidos] = useState<any[]>([]);
    const [pedidoAtual, setPedidoAtual] = useState<any | null>(null);
    const [isDialogAlertaOpen, setIsDialogAlertaOpen] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio('/sounds/alert.mp3');

        const alertaSalvo = localStorage.getItem("alertaSonoroHabilitado");
        const conexaoSalva = localStorage.getItem("conexaoHabilitada");

        if (alertaSalvo) setAlertaSonoroHabilitado(JSON.parse(alertaSalvo));
        if (conexaoSalva) setConexaoHabilitada(JSON.parse(conexaoSalva));
    }, []);

    useEffect(() => {
        async function fetchPedidos() {
            try {
                const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
                const empresaId = empresaData?.id;

                if (empresaId) {
                    const response = await axiosInstance.get(`/empresas/${empresaId}/pedidos`);
                    setPedidos(response.data);
                } else {
                    toast({
                        title: "Erro",
                        description: "Empresa ID não encontrado no localStorage.",
                        variant: "destructive",
                        duration: 5000,
                    });
                }
            } catch (error) {
                toast({
                    title: "Erro ao buscar os pedidos",
                    description: (error as Error).message || "Ocorreu um erro ao carregar os pedidos.",
                    variant: "destructive",
                    duration: 5000,
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchPedidos();
    }, []);

    useEffect(() => {
        const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
        const empresaId = empresaData?.id;

        if (!empresaId || !conexaoHabilitada) {
            return;
        }

        const socket = new SockJS("https://matafome-api.whiteglacier-7456d729.brazilsouth.azurecontainerapps.io/ws");
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe(`/topic/pedidoEmpresa/${empresaId}`, (message) => {
                const novoPedido = JSON.parse(message.body);
                setFilaPedidos((prevFila) => [...prevFila, novoPedido]);

                if (alertaSonoroHabilitado && audioRef.current) {
                    audioRef.current.play().catch((error) => console.log('Erro ao tocar o áudio:', error));
                }

                toast({
                    title: `Novo pedido recebido!`,
                    description: `Pedido #${novoPedido.id} recebido.`,
                    variant: 'success',
                    duration: 3000,
                });
            });
        });

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [conexaoHabilitada, alertaSonoroHabilitado]);

    useEffect(() => {
        if (!pedidoDialogOpen && filaPedidos.length > 0) {
            const proximoPedido = filaPedidos[0];
            setPedidoAtual(proximoPedido);
            setPedidoDialogOpen(true);
        }
    }, [pedidoDialogOpen, filaPedidos]);

    useEffect(() => {
        const conexaoHabilitada = localStorage.getItem("conexaoHabilitada") === "true";
        if (!conexaoHabilitada) {
            setIsDialogAlertaOpen(true); // Exibe imediatamente ao carregar a página
        }

        const interval = setInterval(() => {
            const conexaoHabilitada = localStorage.getItem("conexaoHabilitada") === "true";
            if (!conexaoHabilitada) {
                setIsDialogAlertaOpen(true);
            }
        }, 60000); // 60 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    const handleCloseDialog = () => {
        if (pedidoAtual) {
            setPedidos((prevPedidos) => [...prevPedidos, pedidoAtual]);
        }
        setPedidoDialogOpen(false);
        setFilaPedidos((prevFila) => prevFila.slice(1));
    };

    const atualizarStatusPedido = async (idPedido: number, novoStatus: string, isPagamento: boolean = false) => {
        try {
            const endpoint = isPagamento
                ? `/pedidos/${idPedido}/statusPagamento`
                : `/pedidos/${idPedido}/statusPedido`;
            const body = isPagamento
                ? { novoStatusPagamento: novoStatus }
                : { novoStatusPedido: novoStatus };

            const response = await axiosInstance.patch(endpoint, body);

            setPedidos((pedidos) =>
                pedidos.map((pedido) =>
                    pedido.id === idPedido
                        ? {
                            ...pedido,
                            status: !isPagamento ? novoStatus : pedido.status,
                            statusPagamento: isPagamento ? novoStatus : pedido.statusPagamento,
                        }
                        : pedido
                )
            );

            toast({
                title: `Status ${isPagamento ? 'do pagamento' : 'do pedido'} ${idPedido} atualizado para ${novoStatus}`,
                variant: 'success',
                duration: 3000,
            });
        } catch (error) {
            toast({
                title: `Erro ao atualizar status ${isPagamento ? 'do pagamento' : 'do pedido'} ${idPedido}`,
                variant: 'destructive',
                duration: 3000,
            });
        }
    };

    const handleDateSelect = (range: DateRange | undefined) => {
        setDateRange(range);
    };

    const pedidosFiltrados = pedidos.filter(pedido => {
        const statusMapped = mapStatus(pedido.status);
        const pedidoDate = new Date(pedido.dataHoraPedido);

        const matchesDateRange = dateRange
            ? isWithinInterval(pedidoDate, {
                start: dateRange.from ? startOfDay(dateRange.from) : new Date(0),
                end: dateRange.to ? endOfDay(dateRange.to) : new Date(),
            })
            : true;

        return matchesDateRange &&
            (filtroStatus === "todos" || (
                (filtroStatus === "novo" && statusMapped === 1) ||
                (filtroStatus === "empreparo" && statusMapped === 2) ||
                (filtroStatus === "ementrega" && statusMapped === 3) ||
                (filtroStatus === "entregues" && statusMapped === 4) ||
                (filtroStatus === "cancelados" && statusMapped === 5)
            ));
    });

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(pedidosFiltrados.length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pedidosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    const handleSwitchChange = (checked: boolean) => {
        setConexaoHabilitada(checked);
        setAlertaSonoroHabilitado(checked);

        localStorage.setItem("alertaSonoroHabilitado", JSON.stringify(checked));
        localStorage.setItem("conexaoHabilitada", JSON.stringify(checked));
    };

    return (
        <>
            <MenuCompleto />

            <div className="flex flex-col min-h-screen">
                <div className="flex-1">
                    <div className="flex justify-between p-8">
                        <h2 className="text-3xl font-bold tracking-tight">Acompanhamento de Pedidos</h2>
                        <label className="flex items-center space-x-2">
                            <span>{conexaoHabilitada ? "Desativar recebimento de pedidos" : "Ativar recebimento de pedidos"}</span>
                            <Switch
                                checked={conexaoHabilitada}
                                onCheckedChange={handleSwitchChange}
                            />
                        </label>
                    </div>

                    <Dialog open={pedidoDialogOpen} onOpenChange={handleCloseDialog}>
                        <NovoPedidoDialog
                            isOpen={pedidoDialogOpen}
                            onClose={handleCloseDialog}
                            pedido={pedidoAtual}
                            atualizarStatusPedido={atualizarStatusPedido}
                        />
                    </Dialog>

                    <DialogAlertaConexao
                        isOpen={isDialogAlertaOpen}
                        onClose={() => setIsDialogAlertaOpen(false)}
                        onSwitchChange={handleSwitchChange} // Mesma função para alterar a conexão
                        conexaoHabilitada={conexaoHabilitada}
                        title="ATENÇÃO!"
                        description="O recebimento de pedidos está desabilitado, portanto você não será notificado sobre novos pedidos. Habilite-o no interruptor abaixo ou no canto superior direito dessa página ao fechar esse aviso."
                    />

                    <div className="px-8 mb-8">
                        <div className="mb-4">
                            <Tabs value={filtroStatus} className="space-y-4" onValueChange={(value) => setFiltroStatus(value)}>
                                <div className="flex justify-between">
                                    <TabsList className='w-auto'>
                                        <TabsTrigger value="todos">Todos</TabsTrigger>
                                        <TabsTrigger value="novo">Novos</TabsTrigger>
                                        <TabsTrigger value="empreparo">Em Preparo</TabsTrigger>
                                        <TabsTrigger value="ementrega">Em Entrega</TabsTrigger>
                                        <TabsTrigger value="entregues">Entregues</TabsTrigger>
                                        <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
                                    </TabsList>
                                    <DatePickerHistorico
                                        onDateSelect={handleDateSelect}
                                        initialRange={dateRange}
                                    />
                                </div>
                                <TabsContent value={filtroStatus}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {isLoading ? (
                                            <div>
                                                <p>Carregando seus pedidos...</p>
                                            </div>
                                        ) : currentItems.length === 0 ? (
                                            <p>Nenhum pedido encontrado.</p>
                                        ) : (
                                            currentItems.map((pedido) => (
                                                <Card key={pedido.id} className="flex flex-col shadow-lg">
                                                    <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex gap-4">
                                                                <h2 className="text-xl font-bold tracking-tight">#{pedido.id}</h2>
                                                                <Tag type="time" value={'🕧 ' + formatDateTime(pedido.dataHoraPedido)} />
                                                                <Tag type="status" value={mapStatus(pedido.status)} />
                                                                <Tag type="statusPagamento" value={pedido.statusPagamento} />
                                                            </div>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="transparentOrange" className="p-1">
                                                                        <GiHamburgerMenu className="h-5 w-5" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                                                    {mapStatus(pedido.status) === 1 && (
                                                                        <>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-orange-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'PROCESSANDO')}
                                                                            >
                                                                                Iniciar preparo
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-red-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'CANCELADO')}
                                                                            >
                                                                                Cancelar pedido
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}

                                                                    {mapStatus(pedido.status) === 2 && (
                                                                        <>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-orange-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'EM_TRANSITO')}
                                                                            >
                                                                                Enviar pedido
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-red-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'CANCELADO')}
                                                                            >
                                                                                Cancelar pedido
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}

                                                                    {mapStatus(pedido.status) === 3 && (
                                                                        <>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-orange-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'ENTREGUE')}
                                                                            >
                                                                                Confirmar entrega
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-red-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'CANCELADO')}
                                                                            >
                                                                                Cancelar pedido
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}

                                                                    {pedido.statusPagamento !== 'pago' && (
                                                                        <DropdownMenuItem
                                                                            className="focus:bg-green-600 focus:text-white"
                                                                            onClick={() => atualizarStatusPedido(pedido.id, 'APROVADO', true)}
                                                                        >
                                                                            Confirmar pagamento
                                                                        </DropdownMenuItem>
                                                                    )}

                                                                    {pedido.statusPagamento === 'pago' && pedido.status === 'CANCELADO' && (
                                                                        <DropdownMenuItem
                                                                            className="focus:bg-purple-600 focus:text-white"
                                                                            onClick={() => atualizarStatusPedido(pedido.id, 'REEMBOLSADO', true)}
                                                                        >
                                                                            Reembolsar pagamento
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                        <h3 className='text-sm text-muted-foreground'>
                                                            <strong>Cliente:</strong> {pedido.cliente?.nome} —
                                                            <strong>Telefone: </strong>
                                                            <Link href={formatToWhatsAppLink(pedido.cliente?.foneCelular)} passHref legacyBehavior>
                                                                <a
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-orange-500 underline hover:text-orange-600"
                                                                >
                                                                    {pedido.cliente?.foneCelular}
                                                                </a>
                                                            </Link>
                                                        </h3>

                                                        {pedido.enderecoEntrega && (
                                                            <>
                                                                <h3 className='text-sm text-muted-foreground'>
                                                                    <strong>Endereço: </strong>
                                                                    <Link href={formatToGoogleMapsLink(pedido.enderecoEntrega)} passHref legacyBehavior>
                                                                        <a
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-orange-500 underline hover:text-orange-600"
                                                                        >
                                                                            {pedido.enderecoEntrega.logradouro} {pedido.enderecoEntrega.numero}, {pedido.enderecoEntrega.bairro}, {pedido.enderecoEntrega.cidade}
                                                                        </a>
                                                                    </Link>
                                                                </h3>
                                                                <h3 className='text-sm text-muted-foreground'>
                                                                    <strong>Complemento:</strong> {pedido.enderecoEntrega.complemento}
                                                                </h3>
                                                            </>
                                                        )}
                                                    </CardHeader>
                                                    <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                                        {Array.isArray(pedido.itensPedido) && pedido.itensPedido.length > 0 ? (
                                                            pedido.itensPedido.map((item: any) => (
                                                                <CardConteudoPedido
                                                                    key={item.id}
                                                                    id={item.produto.id}
                                                                    name={item.produto.nome}
                                                                    image={item.produto.urlImagem}
                                                                    description={item.produto.descricao}
                                                                    quantity={item.quantidade}
                                                                    unitPrice={item.produto.preco}
                                                                    totalPrice={item.produto.preco * item.quantidade}
                                                                    additions={item.produto.adicionais || []} // Garantindo que additions é um array
                                                                    observacao={pedido.observacao || "Não há observações."}
                                                                />
                                                            ))
                                                        ) : (
                                                            <p>Nenhum produto encontrado</p>
                                                        )}
                                                    </CardContent>

                                                    {/* Card que exibe o pedido na tela de pedidos */}
                                                    <div className="text-md text-gray-500 mx-6"><strong>Observações:</strong> {pedido.observacao}</div>
                                                    <div className="h-20 border-t border-gray-300 pt-6">
                                                        <div className="flex justify-between px-6 mb-4">
                                                            <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                                            <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ {pedido.valorTotal}</div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                        <PaginationControls
                            currentPage={currentPage}
                            totalItems={pedidosFiltrados.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PedidosPage;
