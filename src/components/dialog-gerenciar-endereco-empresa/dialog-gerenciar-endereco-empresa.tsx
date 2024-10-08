import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from '@/app/axiosConfig';
import axiosInstance from '@/app/axiosConfig';
import { FaSearch } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const estados = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
];

interface DialogGerenciarEnderecoProps {
    isOpen: boolean;
    onClose: () => void;
    endereco: string;
    onUpdate: (field: string, value: string) => void;
}

const DialogGerenciarEndereco: React.FC<DialogGerenciarEnderecoProps> = ({
    isOpen,
    onClose,
    onUpdate,
}) => {
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            if (empresaData && empresaData.endereco) {
                setCep(empresaData.endereco.cep || '');
                setLogradouro(empresaData.endereco.logradouro || '');
                setNumero(empresaData.endereco.numero || '');
                setComplemento(empresaData.endereco.complemento || '');
                setBairro(empresaData.endereco.bairro || '');
                setCidade(empresaData.endereco.cidade || '');
                setEstado(empresaData.endereco.estado || '');
            }
        }
    }, [isOpen]);

    const formatCep = (value: string) => {
        const cleanedValue = value.replace(/\D/g, '');
        if (cleanedValue.length > 5) {
            return cleanedValue.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        }
        return cleanedValue;
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(formatCep(e.target.value));
    };

    const searchCep = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (cep) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { logradouro, bairro, localidade, uf } = response.data;

                setLogradouro(logradouro || '');
                setBairro(bairro || '');
                setCidade(localidade || '');
                setEstado(uf || '');

                // Limpar campos que não são preenchidos automaticamente
                setNumero('');
                setComplemento('');

            } catch (error) {
                toast({
                    title: "Erro ao buscar CEP",
                    description: "Não foi possível buscar o CEP.",
                    variant: "destructive",
                    duration: 3000,
                });
            }
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const empresaId = JSON.parse(localStorage.getItem('empresaData') || '{}').id;

            const enderecoPayload = {
                cep,
                logradouro,
                complemento,
                numero,
                bairro,
                cidade,
                estado,
            };

            await axiosInstance.patch(`/empresas/${empresaId}/enderecos`, enderecoPayload);

            // Atualiza o localStorage com o novo endereço
            const updatedEmpresaData = {
                ...JSON.parse(localStorage.getItem('empresaData') || '{}'),
                endereco: enderecoPayload,
            };
            localStorage.setItem('empresaData', JSON.stringify(updatedEmpresaData));

            onUpdate('endereco', `${logradouro}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}`);
            onClose();

            toast({
                title: "Endereço atualizado com sucesso!",
                variant: "success",
                duration: 3000,
            });
        } catch (error) {
            toast({
                title: "Erro ao atualizar o endereço",
                description: (error as Error).message || "Ocorreu um erro ao tentar atualizar o endereço.",
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
                    <DialogTitle>Gerenciar Endereço</DialogTitle>
                    <DialogDescription>
                        Atualize as informações do endereço do seu estabelecimento.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="cep">CEP</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="cep"
                                type="text"
                                value={cep}
                                onChange={handleCepChange}
                                placeholder="CEP"
                                maxLength={9}
                                disabled={isSaving}
                            />
                            <Button variant="orange" onClick={searchCep} disabled={isSaving}>
                                <FaSearch />
                            </Button>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="logradouro">Logradouro</Label>
                            <Input
                                id="logradouro"
                                type="text"
                                value={logradouro}
                                onChange={(e) => setLogradouro(e.target.value)}
                                placeholder="Logradouro"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="numero">Número</Label>
                            <Input
                                id="numero"
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Número"
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="complemento">Complemento</Label>
                            <Input
                                id="complemento"
                                type="text"
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                placeholder="Complemento"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="bairro">Bairro</Label>
                            <Input
                                id="bairro"
                                type="text"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                placeholder="Bairro"
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-4">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Input
                                id="cidade"
                                type="text"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Cidade"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="estado">Estado</Label>
                            <Select value={estado} onValueChange={setEstado} disabled={isSaving}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {estados.map((estado) => (
                                        <SelectItem key={estado.value} value={estado.value}>
                                            {estado.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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

export default DialogGerenciarEndereco;

