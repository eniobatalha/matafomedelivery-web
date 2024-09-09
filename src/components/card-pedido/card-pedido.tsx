"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoPedido from '@/components/card-conteudo-produto/card-conteudo-pedido';
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
                            {/* Menu de ações */}
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

                {/* Exibe a observação, se existir */}
                {pedido.observacao && (
                    <h3 className='text-sm text-muted-foreground'>
                        <strong>Observação:</strong> {pedido.observacao}
                    </h3>
                )}

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
                        <CardConteudoPedido
                            key={item.id}
                            id={item.produto.id}
                            name={item.produto.nome}
                            image={item.produto.urlImagem}
                            description={item.produto.descricao}
                            quantity={item.quantidade}
                            unitPrice={item.produto.preco}
                            totalPrice={item.produto.preco * item.quantidade}
                            additions={item.produto.adicionais || []}
                            observacao={pedido.observacao || "Não há observações."}
                        />
                    ))
                ) : (
                    <p>Nenhum produto encontrado</p>
                )}
            </CardContent>
            <div className="text-lg text-gray-500 mx-6"><strong>Observações:</strong> {pedido.observacao}</div>
            <div className="h-20 border-t border-gray-300 pt-6">
                <div className="text-xl text-orange-500 font-extrabold">Total</div>
                <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ {pedido.valorTotal}</div>
            </div>
        </Card>
    );
};
