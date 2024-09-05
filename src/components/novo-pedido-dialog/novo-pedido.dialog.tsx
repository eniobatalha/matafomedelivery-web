import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoProduto from '@/components/card-conteudo-produto/card-conteudo-produto';
import { Button } from '@/components/ui/button';
import { Pedido } from '@/types/types';
import Link from 'next/link';
import { formatDateTime, formatToGoogleMapsLink, formatToWhatsAppLink, mapStatus, mapStatusPagamento } from "@/lib/formatters";

interface NovoPedidoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    pedido?: Pedido | null;
    atualizarStatusPedido: (idPedido: number, novoStatus: string, isPagamento?: boolean) => void;
}

const NovoPedidoDialog: React.FC<NovoPedidoDialogProps> = ({ isOpen, onClose, pedido, atualizarStatusPedido }) => {
    if (!pedido) {
        return null;
    }

    // Função para aceitar o pedido e mudar o status para "Em Preparo"
    const handleAceitarPedido = () => {
        atualizarStatusPedido(pedido.id, 'PROCESSANDO');
        onClose();
    };

    // Função para cancelar o pedido e mudar o status para "Cancelado"
    const handleCancelarPedido = () => {
        atualizarStatusPedido(pedido.id, 'CANCELADO');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader className="border-b border-gray-300 pb-2 mb-2">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 mb-2">
                            <DialogTitle className="text-base font-bold tracking-tight">Novo Pedido</DialogTitle>
                            <Tag type="time" value={formatDateTime(pedido.dataHoraPedido)} />
                            <Tag type="status" value={1} /> {/* Todo pedido chega como novo (status 1) */}
                            <Tag type="statusPagamento" value={pedido.statusPagamento || 'pendente'} />
                        </div>
                    </div>
                    <DialogDescription className='text-sm text-muted-foreground'>
                        <strong>Cliente:</strong> {pedido.cliente.nome} —
                        <strong>Telefone: </strong>
                        <Link href={formatToWhatsAppLink(pedido.cliente.foneCelular)} passHref legacyBehavior>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 underline hover:text-orange-600"
                            >
                                {pedido.cliente.foneCelular}
                            </a>
                        </Link>
                    </DialogDescription>
                    <DialogDescription className='text-xs text-muted-foreground'>
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
                    </DialogDescription>
                    <DialogDescription className='text-xs text-muted-foreground'>
                        <strong>Complemento:</strong> {pedido.enderecoEntrega.complemento}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-96 overflow-y-auto pr-2">
                    {pedido.itensPedido.map((item) => (
                        <CardConteudoProduto
                            key={item.id}
                            id={Number(item.produto.id)}
                            name={item.produto.nome}
                            image={item.produto.urlImagem}
                            description={item.produto.descricao}
                            quantity={item.quantidade}
                            unitPrice={Number(item.produto.preco)}
                            totalPrice={Number(item.produto.preco) * item.quantidade}
                            additions={item.produto.adicionais || []}
                        />
                    ))}
                </div>
                <div className="h-20 border-t border-gray-300 pt-6">
                    <div className="flex justify-between px-6 mb-4">
                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">
                            R$ {pedido.itensPedido.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0).toFixed(2)}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="orange" onClick={handleAceitarPedido}>Aceitar Pedido</Button>
                    <Button variant="destructive" onClick={handleCancelarPedido}>Cancelar Pedido</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NovoPedidoDialog;
