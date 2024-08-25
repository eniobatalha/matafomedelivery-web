import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from '@/app/axiosConfig';

interface DialogGerenciarContaProps {
  isOpen: boolean;
  onClose: () => void;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone: string;
  onUpdate: (field: string, value: string) => void;
}

const DialogGerenciarConta: React.FC<DialogGerenciarContaProps> = ({
  isOpen,
  onClose,
  razaoSocial,
  nomeFantasia,
  email,
  telefone,
  onUpdate,
}) => {
  const [localRazaoSocial, setLocalRazaoSocial] = useState(razaoSocial);
  const [localNomeFantasia, setLocalNomeFantasia] = useState(nomeFantasia);
  const [localEmail, setLocalEmail] = useState(email);
  const [localTelefone, setLocalTelefone] = useState(telefone);

  // Carregar dados da empresa quando o diálogo for aberto
  useEffect(() => {
    if (isOpen) {
      const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
      if (empresaData) {
        setLocalRazaoSocial(empresaData.razaoSocial || '');
        setLocalNomeFantasia(empresaData.nomeFantasia || '');
        setLocalEmail(empresaData.usuario?.username || '');
        setLocalTelefone(empresaData.telefone || '');
      }
    }
  }, [isOpen]);

  // Função para formatar o telefone no formato (99) 99999-9999
  const formatPhone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length > 10) {
      return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleanedValue.length > 5) {
      return cleanedValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (cleanedValue.length > 2) {
      return cleanedValue.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      return cleanedValue.replace(/(\d{0,2})/, '($1');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTelefone(formatPhone(e.target.value));
  };

  const handleSave = async () => {
    try {
      const empresaId = JSON.parse(localStorage.getItem('empresaData') || '{}').id;

      const payload: {
        razaoSocial: string;
        nomeFantasia: string;
        telefone: string;
        usuario?: {
          username: string;
        };
      } = {
        razaoSocial: localRazaoSocial,
        nomeFantasia: localNomeFantasia,
        telefone: localTelefone,
      };

      if (localEmail !== email) {
        payload['usuario'] = {
          username: localEmail,
        };
      }

      await axios.patch(`/api/empresas/${empresaId}`, payload);

      onUpdate('razaoSocial', localRazaoSocial);
      onUpdate('nomeFantasia', localNomeFantasia);
      onUpdate('email', localEmail);
      onUpdate('telefone', localTelefone);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar a conta:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar Conta</DialogTitle>
          <DialogDescription>
            Atualize suas informações de conta.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label htmlFor="razaosocial">Razão Social</Label>
            <Input
              id="razaosocial"
              type="text"
              value={localRazaoSocial}
              onChange={(e) => setLocalRazaoSocial(e.target.value)}
              placeholder="Razão Social"
            />
          </div>
          <div>
            <Label htmlFor="nomefantasia">Nome Fantasia</Label>
            <Input
              id="nomefantasia"
              type="text"
              value={localNomeFantasia}
              onChange={(e) => setLocalNomeFantasia(e.target.value)}
              placeholder="Nome Fantasia"
            />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="text"
              value={localTelefone}
              onChange={handlePhoneChange}
              placeholder="Ex: (99) 98765-4321"
              maxLength={15} // Limita o tamanho do telefone formatado
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="orange" onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogGerenciarConta;
