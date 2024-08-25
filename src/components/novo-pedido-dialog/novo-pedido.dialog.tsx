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
import { Pedido } from '@/mocks/mockPedidos'; 
import Link from 'next/link';

interface NovoPedidoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    pedido?: Pedido;
}

function formatToWhatsAppLink(phoneNumber: string) {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = `55${cleanedNumber}`;
    return `https://wa.me/${formattedNumber}`;
}

function formatToGoogleMapsLink(endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
}) {
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
                            <Tag type="time" value={pedido.dataHora} />
                            <Tag type="status" value={1} />
                        </div>
                    </div>
                    <DialogDescription className='text-sm text-muted-foreground'>
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
                    </DialogDescription>
                    <DialogDescription className='text-xs text-muted-foreground'>
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
                    </DialogDescription>
                    <DialogDescription className='text-xs text-muted-foreground'>
                        <strong>Complemento:</strong> {pedido.enderecoPedido[0].complemento}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-96 overflow-y-auto pr-2">
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
                </div>
                <div className="h-20 border-t border-gray-300 pt-6">
                    <div className="flex justify-between px-6 mb-4">
                        <div className="text-xl text-orange-500 font-extrabold">Total</div>
                        <div className="text-2xl text-orange-500 font-extrabold tracking-tight">R$ {pedido.total}</div>
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
