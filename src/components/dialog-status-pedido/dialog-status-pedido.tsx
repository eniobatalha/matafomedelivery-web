"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogConfirmacaoProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    idPedido: number;
    valorTotal: number;
    novoStatus: string;
}

const DialogConfirmacao: React.FC<DialogConfirmacaoProps> = ({
    isOpen,
    onClose,
    onConfirm,
    idPedido,
    valorTotal,
    novoStatus,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Confirmar Ação</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Confirma mudança de status do pedido ID: {idPedido} - R${valorTotal} para {novoStatus}?
                </DialogDescription>
                <DialogFooter>
                    <Button variant="destructive" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="orange" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogConfirmacao;
