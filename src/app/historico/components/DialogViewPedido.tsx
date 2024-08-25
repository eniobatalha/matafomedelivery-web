import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Payment } from "@/app/historico/columns";

interface DialogViewPedidoProps {
    isOpen: boolean;
    onClose: () => void;
    pedido: Payment;
}

const DialogViewPedido: React.FC<DialogViewPedidoProps> = ({ isOpen, onClose, pedido }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalhes do Pedido</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <p>ID do Pedido: {pedido.pedido}</p>
                    <p>Cliente: {pedido.cliente}</p>
                    <p>Status: {pedido.status}</p>
                    <p>Bairro: {pedido.bairro}</p>
                    <p>Total: R$ {pedido.total}</p>
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={onClose}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogViewPedido;
