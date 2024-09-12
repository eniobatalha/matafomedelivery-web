import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from '@/app/axiosConfig';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { convertTo24HourFormat } from '@/lib/formatters';
import { categorias, categoriaMap } from '@/lib/constants';

interface DialogGerenciarDadosEmpresaProps {
  isOpen: boolean;
  onClose: () => void;
  razaoSocial: string;
  nomeFantasia: string;
  telefone: string;
  categoria: string;
  horarioAbertura: string;
  horarioFechamento: string;
  onUpdate: (field: string, value: string) => void;
}

const DialogGerenciarDadosEmpresa: React.FC<DialogGerenciarDadosEmpresaProps> = ({
  isOpen,
  onClose,
  razaoSocial,
  nomeFantasia,
  telefone,
  categoria,
  horarioAbertura,
  horarioFechamento,
  onUpdate,
}) => {
  const [localRazaoSocial, setLocalRazaoSocial] = useState(razaoSocial);
  const [localNomeFantasia, setLocalNomeFantasia] = useState(nomeFantasia);
  const [localTelefone, setLocalTelefone] = useState(telefone);
  const [localCategoria, setLocalCategoria] = useState('');
  const [localHorarioAbertura, setLocalHorarioAbertura] = useState(horarioAbertura);
  const [localHorarioFechamento, setLocalHorarioFechamento] = useState(horarioFechamento);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
      if (empresaData) {
        setLocalRazaoSocial(empresaData.razaoSocial || '');
        setLocalNomeFantasia(empresaData.nomeFantasia || '');
        setLocalTelefone(empresaData.telefone || '');

        // Ajusta o value do select baseado no label salvo
        const categoriaValue = categorias.find(c => c.label.toLowerCase() === empresaData.categoria.toLowerCase())?.value || '';
        setLocalCategoria(categoriaValue);

        setLocalHorarioAbertura(empresaData.horarioAbertura || '');
        setLocalHorarioFechamento(empresaData.horarioFechamento || '');
      }
    }
  }, [isOpen]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const empresaId = JSON.parse(localStorage.getItem('empresaData') || '{}').id;

      const payload = {
        razaoSocial: localRazaoSocial,
        nomeFantasia: localNomeFantasia,
        telefone: localTelefone,
        categoria: categoriaMap[localCategoria], // Converte para o valor correto que a API espera
        horarioAbertura: convertTo24HourFormat(localHorarioAbertura),
        horarioFechamento: convertTo24HourFormat(localHorarioFechamento),
      };

      // console.log("Payload:", payload);

      const response = await axios.patch(`/empresas/${empresaId}`, payload);

      // Atualize o estado local e o localStorage com os novos dados
      const updatedEmpresaData = { ...response.data }; // Usando a resposta da API
      setLocalRazaoSocial(updatedEmpresaData.razaoSocial);
      setLocalNomeFantasia(updatedEmpresaData.nomeFantasia);
      setLocalTelefone(updatedEmpresaData.telefone);
      setLocalCategoria(updatedEmpresaData.categoria);
      setLocalHorarioAbertura(updatedEmpresaData.horarioAbertura);
      setLocalHorarioFechamento(updatedEmpresaData.horarioFechamento);

      localStorage.setItem('empresaData', JSON.stringify({
        ...updatedEmpresaData,
        categoria: categorias.find(c => c.value === updatedEmpresaData.categoria)?.label || updatedEmpresaData.categoria
      }));

      onUpdate('razaoSocial', updatedEmpresaData.razaoSocial);
      onUpdate('nomeFantasia', updatedEmpresaData.nomeFantasia);
      onUpdate('telefone', updatedEmpresaData.telefone);
      onUpdate('categoria', updatedEmpresaData.categoria);
      onUpdate('horarioAbertura', updatedEmpresaData.horarioAbertura);
      onUpdate('horarioFechamento', updatedEmpresaData.horarioFechamento);

      toast({
        title: "Sucesso",
        description: "Informações atualizadas com sucesso!",
        variant: "success",
        duration: 3000,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: (error as Error).message || "Ocorreu um erro ao tentar atualizar as informações.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar Informações da Empresa</DialogTitle>
          <DialogDescription>
            Atualize as informações da sua empresa.
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
              disabled={isSaving}
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
              disabled={isSaving}
            />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="text"
              value={localTelefone}
              onChange={(e) => setLocalTelefone(e.target.value)}
              placeholder="Ex: (99) 98765-4321"
              maxLength={15}
              disabled={isSaving}
            />
          </div>

          {/* Select com Shadcn UI */}
          <div className="flex-1">
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={localCategoria} onValueChange={setLocalCategoria} disabled={isSaving}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.value} value={categoria.value}>
                    {categoria.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-4">
            <div className='flex-1'>
              <Label htmlFor="horarioAbertura">Horário de Abertura</Label>
              <Input
                id="horarioAbertura"
                type="time"
                value={localHorarioAbertura}
                onChange={(e) => setLocalHorarioAbertura(e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div className='flex-1'>
              <Label htmlFor="horarioFechamento">Horário de Fechamento</Label>
              <Input
                id="horarioFechamento"
                type="time"
                value={localHorarioFechamento}
                onChange={(e) => setLocalHorarioFechamento(e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="orange" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogGerenciarDadosEmpresa;
