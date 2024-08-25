import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Payment } from '@/app/historico/columns';

interface DialogViewClienteProps {
    isOpen: boolean;
    onClose: () => void;
    cliente: Payment;
}

const DialogViewCliente: React.FC<DialogViewClienteProps> = ({ isOpen, onClose, cliente }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Informações do Cliente</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <p>ID do Pedido: {cliente.pedido}</p>
                    <p>Nome: {cliente.cliente}</p>
                    <p>Bairro: {cliente.bairro}</p>
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={onClose}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogViewCliente;
