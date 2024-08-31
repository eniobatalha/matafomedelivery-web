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

interface NovoPedidoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    pedido?: Pedido | null;
}

function formatToWhatsAppLink(phoneNumber: string) {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = `55${cleanedNumber}`;
    return `https://wa.me/${formattedNumber}`;
}

function formatToGoogleMapsLink(endereco: Pedido['enderecoEntrega']) {
    const baseUrl = "https://www.google.com/maps/dir/?api=1&destination=";
    const fullAddress = `${endereco.logradouro} ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}`;
    return `${baseUrl}${encodeURIComponent(fullAddress)}&origin=-8.11330612798356,-35.030793`;
}

const NovoPedidoDialog: React.FC<NovoPedidoDialogProps> = ({ isOpen, onClose, pedido }) => {
    if (!pedido) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader className="border-b border-gray-300 pb-2 mb-2">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 mb-2">
                            <DialogTitle className="text-base font-bold tracking-tight">Novo Pedido</DialogTitle>
                            <Tag type="time" value={pedido.dataHoraPedido} />
                            <Tag type="status" value={pedido.status} />
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
                            additions={item.produto.adicionais?.map((addition) => addition.nome) || []}
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
                    <Button variant="orange">Aceitar Pedido</Button>
                    <Button variant="destructive" onClick={onClose}>Cancelar Pedido</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NovoPedidoDialog;
