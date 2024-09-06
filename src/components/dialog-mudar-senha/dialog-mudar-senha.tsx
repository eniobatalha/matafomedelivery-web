import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast'; 
import axios from '@/app/axiosConfig'; // Corrigido para o caminho correto

interface DialogMudarSenhaProps {
    isOpen: boolean;
    onClose: () => void;
}

const DialogMudarSenha: React.FC<DialogMudarSenhaProps> = ({ isOpen, onClose }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
    const email = empresaData?.usuario?.username;

    const handleSave = async () => {
        if (newPassword !== confirmNewPassword) {
            toast({
                title: "Erro",
                description: "As senhas não conferem.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            await axios.post('/login/trocarSenha', {
                email: email,
                novaSenha: newPassword,
            });

            toast({
                title: "Sucesso",
                description: "Senha alterada com sucesso.",
                variant: "success",
            });

            handleClose(); // Fechar o dialog após alteração bem-sucedida
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível alterar a senha.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setNewPassword(''); // Limpa o valor da nova senha
        setConfirmNewPassword(''); // Limpa o valor da confirmação da nova senha
        onClose(); // Fecha o dialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => open ? null : handleClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Alterar Senha</DialogTitle>
                    <DialogDescription>
                        Aqui você pode alterar sua senha.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <Label htmlFor="new-password">Digite a Nova Senha</Label>
                        <Input 
                            id="new-password" 
                            type="password" 
                            placeholder="Nova Senha" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirm-new-password">Confirme a Nova Senha</Label>
                        <Input 
                            id="confirm-new-password" 
                            type="password" 
                            placeholder="Confirmar Nova Senha" 
                            value={confirmNewPassword} 
                            onChange={(e) => setConfirmNewPassword(e.target.value)} 
                        />
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={handleClose} variant="secondary" disabled={isLoading}>
                        Fechar
                    </Button>
                    <Button onClick={handleSave} variant="orange" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogMudarSenha;
