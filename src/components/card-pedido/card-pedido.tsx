"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoProduto from '@/components/card-conteudo-produto/card-conteudo-produto';
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { formatDateTime, formatToGoogleMapsLink, formatToWhatsAppLink, mapStatus, mapStatusPagamento } from "@/lib/formatters";

interface PedidoCardProps {
    pedido: any;
    onUpdateStatus: (idPedido: number, novoStatus: string, novoStatusPagamento?: string) => void;
}

export const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, onUpdateStatus }) => {
    return (
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
                                        onClick={() => onUpdateStatus(pedido.id, 'PROCESSANDO')}
                                    >
                                        Iniciar preparo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="focus:bg-red-600 focus:text-white"
                                        onClick={() => onUpdateStatus(pedido.id, 'CANCELADO', 'cancelado')}
                                    >
                                        Cancelar
                                    </DropdownMenuItem>
                                </>
                            )}
                            {mapStatus(pedido.status) === 2 && (
                                <>
                                    <DropdownMenuItem
                                        onClick={() => onUpdateStatus(pedido.id, 'EM_TRANSITO')}
                                    >
                                        Enviar pedido
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="focus:bg-red-600 focus:text-white"
                                        onClick={() => onUpdateStatus(pedido.id, 'CANCELADO', 'cancelado')}
                                    >
                                        Cancelar
                                    </DropdownMenuItem>
                                </>
                            )}
                            {mapStatus(pedido.status) === 3 && (
                                <>
                                    <DropdownMenuItem
                                        onClick={() => onUpdateStatus(pedido.id, 'ENTREGUE')}
                                    >
                                        Confirmar entrega
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="focus:bg-red-600 focus:text-white"
                                        onClick={() => onUpdateStatus(pedido.id, 'CANCELADO', 'cancelado')}
                                    >
                                        Cancelar
                                    </DropdownMenuItem>
                                </>
                            )}
                            {pedido.statusPagamento === 'pendente' && (
                                <DropdownMenuItem
                                    className="focus:bg-green-600 focus:text-white"
                                    onClick={() => onUpdateStatus(pedido.id, pedido.status, 'pago')}
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
                            additions={item.produto.adicionais || []}
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
    );
};
