"use client";

import React, { useState, useEffect } from "react";
import MenuCompleto from "@/components/menu-completo/menu-completo";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoProduto from '@/components/card-conteudo-produto/card-conteudo-produto';
import NovoPedidoDialog from '@/components/novo-pedido-dialog/novo-pedido.dialog';
import axiosInstance from '@/app/axiosConfig';
import { PaginationControls } from "@/components/pagination-controls/pagination-controls";
import { formatDateTime, formatToWhatsAppLink, formatToGoogleMapsLink, mapStatus } from "@/lib/formatters";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerHistorico } from "@/components/datepicker-historico/datepicker-historico";

const PedidosPage = () => {
    const [filtroStatus, setFiltroStatus] = useState<string>("todos");
    const [pedidoDialogOpen, setPedidoDialogOpen] = useState<boolean>(false);
    const [pedidoAleatorio, setPedidoAleatorio] = useState<any>(null);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: startOfDay(new Date(Date.now() - 86400000)), // Ontem
        to: endOfDay(new Date()), // Hoje
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPedidos() {
            try {
                const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
                const empresaId = empresaData?.id;

                if (empresaId) {
                    const response = await axiosInstance.get(`/empresas/${empresaId}/pedidos`);
                    setPedidos(response.data);
                } else {
                    console.error("Empresa ID não encontrado no localStorage");
                }
            } catch (error) {
                console.error("Erro ao buscar os pedidos:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPedidos();
    }, []);
    const atualizarStatusPedido = async (idPedido: number, novoStatus: string, novoStatusPagamento?: string) => {
        try {
            const endpoint = `/pedidos/${idPedido}/status`;
            console.log(`Requisição PATCH para ${endpoint} com status: ${novoStatus}`);

            const response = await axiosInstance.patch(endpoint, novoStatus, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Resposta da API:', response.data);

            setPedidos((pedidos) =>
                pedidos.map((pedido) =>
                    pedido.id === idPedido
                        ? {
                            ...pedido,
                            status: novoStatus,
                            statusPagamento: novoStatusPagamento || pedido.statusPagamento,
                        }
                        : pedido
                )
            );

            toast({
                title: `Status do pedido ${idPedido} atualizado para ${novoStatus}`,
                variant: 'success',
                duration: 3000,
            });
        } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
            toast({
                title: `Erro ao atualizar status do pedido ${idPedido}`,
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

        return (
            matchesDateRange &&
            (filtroStatus === "todos" || (
                (filtroStatus === "novo" && statusMapped === 1) ||
                (filtroStatus === "empreparo" && statusMapped === 2) ||
                (filtroStatus === "ementrega" && statusMapped === 3) ||
                (filtroStatus === "entregues" && statusMapped === 4) ||
                (filtroStatus === "cancelados" && statusMapped === 5)
            ))
        );
    });
    const handleNovoPedido = () => {
        const pedido = pedidos[Math.floor(Math.random() * pedidos.length)];
        setPedidoAleatorio(pedido);
        setPedidoDialogOpen(true);
        const audio = new Audio('/sounds/alert.mp3');
        audio.play();
    };

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(pedidosFiltrados.length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pedidosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <MenuCompleto />

            <div className="flex flex-col min-h-screen">
                <div className="flex-1">
                    <div className="flex justify-between p-8">
                        <h2 className="text-3xl font-bold tracking-tight">Acompanhamento de Pedidos</h2>
                        <div className="flex gap-4">

                            <Button onClick={handleNovoPedido} variant="outlineOrange" type="button" className='gap-2'>
                                <MdDeliveryDining className="h-5 w-5" />
                                Simular Novo Pedido
                            </Button>
                        </div>
                    </div>
                    <Dialog open={pedidoDialogOpen} onOpenChange={() => setPedidoDialogOpen(false)}>
                        <NovoPedidoDialog
                            isOpen={pedidoDialogOpen}
                            onClose={() => setPedidoDialogOpen(false)}
                            pedido={pedidoAleatorio}
                        />
                    </Dialog>
                    <div className="px-8 mb-8">
                        <div className="mb-4">
                            <Tabs defaultValue="todos" className="space-y-4" onValueChange={(value) => setFiltroStatus(value)}>
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
                                            <p>Nenhuma categoria encontrada.</p>
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
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'CANCELADO', 'cancelado')}
                                                                            >
                                                                                Cancelar
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                    {mapStatus(pedido.status) === 2 && (
                                                                        <>
                                                                            <DropdownMenuItem
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'EM_TRANSITO')}
                                                                            >
                                                                                Enviar pedido
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-red-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'CANCELADO', 'cancelado')}
                                                                            >
                                                                                Cancelar
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                    {mapStatus(pedido.status) === 3 && (
                                                                        <>
                                                                            <DropdownMenuItem
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'ENTREGUE')}
                                                                            >
                                                                                Confirmar entrega
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                className="focus:bg-red-600 focus:text-white"
                                                                                onClick={() => atualizarStatusPedido(pedido.id, 'CANCELADO', 'cancelado')}
                                                                            >
                                                                                Cancelar
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                    {pedido.statusPagamento === 'pendente' && (
                                                                        <DropdownMenuItem
                                                                            className="focus:bg-green-600 focus:text-white"
                                                                            onClick={() => atualizarStatusPedido(pedido.id, pedido.status, 'pago')}
                                                                        >
                                                                            Confirmar pagamento
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
                                                                <h3 className='text-xs text-muted-foreground'>
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
                                                                <h3 className='text-xs text-muted-foreground'>
                                                                    <strong>Complemento:</strong> {pedido.enderecoEntrega.complemento}
                                                                </h3>
                                                            </>
                                                        )}
                                                    </CardHeader>
                                                    <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                                        {Array.isArray(pedido.itensPedido) && pedido.itensPedido.length > 0 ? (
                                                            pedido.itensPedido.map((item: any) => (
                                                                <CardConteudoProduto
                                                                    key={item.id}
                                                                    id={item.produto.id}
                                                                    name={item.produto.nome}
                                                                    image={item.produto.urlImagem}
                                                                    description={item.produto.descricao}
                                                                    quantity={item.quantidade}
                                                                    unitPrice={item.produto.preco}
                                                                    totalPrice={item.produto.preco * item.quantidade}
                                                                    additions={item.produto.adicionais || []} // Garantindo que additions é um array
                                                                />
                                                            ))
                                                        ) : (
                                                            <p>Nenhum produto encontrado</p>
                                                        )}
                                                    </CardContent>
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
                        {/* Componente de Paginação */}
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



