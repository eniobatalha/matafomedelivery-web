import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';

interface DialogMudarSenhaProps {
    isOpen: boolean;
    onClose: () => void;
}

const DialogMudarSenha: React.FC<DialogMudarSenhaProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => open ? null : onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Alterar Senha</DialogTitle>
                    <DialogDescription>
                        Aqui você pode alterar sua senha.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="current-password">Digite a Senha Atual</Label>
                        <Input id="current-password" type="password" placeholder="Senha Atual" />
                    </div>
                    <div>
                        <Label htmlFor="new-password">Digite a Nova Senha</Label>
                        <Input id="new-password" type="password" placeholder="Nova Senha" />
                    </div>
                    <div>
                        <Label htmlFor="confirm-new-password">Confirme a Nova Senha</Label>
                        <Input id="confirm-new-password" type="password" placeholder="Confirmar Nova Senha" />
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={onClose} variant="secondary">
                        Fechar
                    </Button>
                    <Button type="submit" variant="orange">
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogMudarSenha;
