import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DialogConfirmarLogoutProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmLogout: () => void;
}

const DialogConfirmarLogout: React.FC<DialogConfirmarLogoutProps> = ({ isOpen, onClose, onConfirmLogout }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Logout</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja sair?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onConfirmLogout}>
                        Sair
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogConfirmarLogout;
