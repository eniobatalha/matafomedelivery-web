"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
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
} from "@/components/ui/tabs"
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoProduto from '@/components/card-conteudo-produto/card-conteudo-produto';
import MenuCompleto from '@/components/menu-completo/menu-completo';
import { Footer } from '@/components/footer/footer';
import { pedidosMock } from '@/mocks/mockPedidos';
import NovoPedidoDialog from '@/components/novo-pedido-dialog/novo-pedido.dialog';

function formatToWhatsAppLink(phoneNumber: string) {
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

const PedidosPage = () => {
    const [filtroStatus, setFiltroStatus] = useState<string>("todos");
    const [pedidoDialogOpen, setPedidoDialogOpen] = useState<boolean>(false);
    const [pedidoAleatorio, setPedidoAleatorio] = useState<any>(null);

    const pedidosFiltrados = filtroStatus === "todos"
        ? pedidosMock
        : pedidosMock.filter(pedido => {
            if (filtroStatus === "empreparo") return pedido.status === 2;
            if (filtroStatus === "ementrega") return pedido.status === 3;
            if (filtroStatus === "entregues") return pedido.status === 4;
            if (filtroStatus === "cancelados") return pedido.status === 5;
        });

    const handleNovoPedido = () => {
        const pedido = pedidosMock[Math.floor(Math.random() * pedidosMock.length)];
        setPedidoAleatorio(pedido);
        setPedidoDialogOpen(true);
        const audio = new Audio('/sounds/alert.mp3');
        audio.play();
    };

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
                                    <TabsTrigger value="empreparo">Em Preparo</TabsTrigger>
                                    <TabsTrigger value="ementrega">Em Entrega</TabsTrigger>
                                    <TabsTrigger value="entregues">Entregues</TabsTrigger>
                                    <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
                                </TabsList>
                                <TabsContent value={filtroStatus}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {pedidosFiltrados.map((pedido) => (
                                            <Card key={pedido.id} className="flex flex-col shadow-lg">
                                                <CardHeader className="border-b border-gray-300 bg-orange-100 pb-2 mb-2">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-4">
                                                            <h2 className="text-xl font-bold tracking-tight">#{pedido.id}</h2>
                                                            <Tag type="time" value={pedido.dataHora} />
                                                            <Tag type="status" value={pedido.status} />
                                                        </div>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="transparentOrange" className="p-1">
                                                                    <GiHamburgerMenu className="h-5 w-5" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                                    Iniciar preparo
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                                    Enviar pedido
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                                                                    Cancelar pedido
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <h3 className='text-sm text-muted-foreground'>
                                                        <strong>Cliente:</strong> {pedido.cliente} — 
                                                        <strong>Telefone: </strong>
                                                        <Link href={formatToWhatsAppLink(pedido.telefone)} passHref legacyBehavior>
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-orange-500 underline hover:text-orange-600"
                                                            >
                                                                {pedido.telefone}
                                                            </a>
                                                        </Link>
                                                    </h3>
                                                    <h3 className='text-xs text-muted-foreground'>
                                                        <strong>Endereço: </strong>
                                                        <Link href={formatToGoogleMapsLink(pedido.enderecoPedido[0])} passHref legacyBehavior>
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-orange-500 underline hover:text-orange-600"
                                                            >
                                                                {pedido.enderecoPedido[0].logradouro} {pedido.enderecoPedido[0].numero}, {pedido.enderecoPedido[0].bairro}, {pedido.enderecoPedido[0].cidade}
                                                            </a>
                                                        </Link>
                                                    </h3>
                                                    <h3 className='text-xs text-muted-foreground'>
                                                        <strong> Complemento:</strong> {pedido.enderecoPedido[0].complemento}
                                                    </h3>
                                                </CardHeader>
                                                <CardContent className="pb-2 mb-4 mt-4 flex-1">
                                                    {pedido.produtos.map((produto) => (
                                                        <CardConteudoProduto
                                                            key={produto.id}
                                                            id={produto.id}
                                                            name={produto.name}
                                                            image={produto.image}
                                                            description={produto.description}
                                                            quantity={produto.quantity}
                                                            unitPrice={produto.unitPrice}
                                                            totalPrice={produto.totalPrice}
                                                            additions={produto.additions}
                                                        />
                                                    ))}
                                                </CardContent>
                                                <div className="h-20 border-t border-gray-300 pt-6">
                                                    <div className="flex justify-between px-6 mb-4">
                                                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                                                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ {pedido.total}</div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PedidosPage;
