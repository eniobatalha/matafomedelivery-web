"use client";

import React, { useState, useEffect } from "react";
import MenuCompleto from "@/components/menu-completo/menu-completo";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoProduto from '@/components/card-conteudo-produto/card-conteudo-produto';
import NovoPedidoDialog from '@/components/novo-pedido-dialog/novo-pedido.dialog';
import axiosInstance from '@/app/axiosConfig';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

function formatToWhatsAppLink(phoneNumber: string | undefined | null) {
    if (!phoneNumber) {
        return "#";
    }
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = `55${cleanedNumber}`;
    return `https://wa.me/${formattedNumber}`;
}

function formatToGoogleMapsLink(endereco: any) {
    const { logradouro, numero, bairro, cidade, estado } = endereco;
    const destination = `${logradouro} ${numero}, ${bairro}, ${cidade} ${estado}`;
    const startingPoint = "-8.11330612798356,-35.030793";
    return `https://www.google.com/maps/dir/${startingPoint}/${encodeURIComponent(destination)}`;
}

function mapStatus(status: string): number {
    switch (status) {
        case "PENDENTE":
            return 1;
        case "PROCESSANDO":
            return 2;
        case "EM_TRANSITO":
            return 3;
        case "ENTREGUE":
            return 4;
        case "CANCELADO":
            return 5;
        default:
            return 0; // Desconhecido
    }
}

function formatDateTime(dateTimeString: string): string {
    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}$/;

    if (isoFormatRegex.test(dateTimeString)) {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return dateTimeString;
}

const PedidosPage = () => {
    const [filtroStatus, setFiltroStatus] = useState<string>("todos");
    const [pedidoDialogOpen, setPedidoDialogOpen] = useState<boolean>(false);
    const [pedidoAleatorio, setPedidoAleatorio] = useState<any>(null);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const { toast } = useToast();

    // Defina as variáveis de controle de paginação
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

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

    const pedidosFiltrados = filtroStatus === "todos"
        ? pedidos
        : pedidos.filter(pedido => {
            const statusMapped = mapStatus(pedido.status);
            if (filtroStatus === "novo") return statusMapped === 1;
            if (filtroStatus === "empreparo") return statusMapped === 2;
            if (filtroStatus === "ementrega") return statusMapped === 3;
            if (filtroStatus === "entregues") return statusMapped === 4;
            if (filtroStatus === "cancelados") return statusMapped === 5;
        });

    const handleNovoPedido = () => {
        const pedido = pedidos[Math.floor(Math.random() * pedidos.length)];
        setPedidoAleatorio(pedido);
        setPedidoDialogOpen(true);
        const audio = new Audio('/sounds/alert.mp3');
        audio.play();
    };

    // Função para alterar a página
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(pedidosFiltrados.length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
    };

    // Função para calcular os itens a serem exibidos na página atual
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
                        <Button onClick={handleNovoPedido} variant="outlineOrange" type="button" className='gap-2'>
                            <MdDeliveryDining className="h-5 w-5" />
                            Simular Novo Pedido
                        </Button>
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
                                <TabsList className='w-auto'>
                                    <TabsTrigger value="todos">Todos</TabsTrigger>
                                    <TabsTrigger value="novo">Novos</TabsTrigger>
                                    <TabsTrigger value="empreparo">Em Preparo</TabsTrigger>
                                    <TabsTrigger value="ementrega">Em Entrega</TabsTrigger>
                                    <TabsTrigger value="entregues">Entregues</TabsTrigger>
                                    <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
                                </TabsList>
                                <TabsContent value={filtroStatus}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {currentItems.map((pedido) => (
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
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                        {/* Componente de Paginação */}
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    {currentPage > 1 ? (
                                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                                    ) : (
                                        <span className="pagination-link-disabled">Anterior</span> // Crie uma classe CSS para desabilitar visualmente o link
                                    )}
                                </PaginationItem>
                                {[...Array(Math.ceil(pedidosFiltrados.length / itemsPerPage)).keys()].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(index + 1)}
                                            isActive={currentPage === index + 1}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    {currentPage < Math.ceil(pedidosFiltrados.length / itemsPerPage) ? (
                                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                                    ) : (
                                        <a><span className="pagination-link-disabled">Próximo</span></a>
                                    )}
                                </PaginationItem>
                            </PaginationContent>

                        </Pagination>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PedidosPage;



