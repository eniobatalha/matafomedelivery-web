import React, { useState, useEffect } from 'react';
import axios from '@/app/axiosConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Opcional {
    id?: number;
    nome: string;
    valor: number;
    descricao: string;
    qtd?: number;
}

interface DialogGerenciarOpcionaisProps {
    isOpen: boolean;
    onClose: () => void;
    produtoId: number;
    categoriaId: number;
}

const DialogGerenciarOpcionais: React.FC<DialogGerenciarOpcionaisProps> = ({
    isOpen,
    onClose,
    produtoId,
    categoriaId
}) => {
    const [opcionais, setOpcionais] = useState<Opcional[]>([]);
    const [newOpcional, setNewOpcional] = useState<Opcional>({ nome: '', valor: 0, descricao: '', qtd: 1 });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Para saber se está editando um opcional existente
    const [opcionalToEditId, setOpcionalToEditId] = useState<number | null>(null); // Armazena o ID do opcional sendo editado

    useEffect(() => {
        if (isOpen) {
            loadOpcionais();
        }
    }, [isOpen]);

    const loadOpcionais = async () => {
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            const response = await axios.get(`/empresas/${empresaId}/prateleiras/${categoriaId}/produtos/${produtoId}/adicionais`);

            setOpcionais(response.data.adicionais || []);
        } catch (error) {
            console.error('Erro ao carregar opcionais:', error);
            setOpcionais([]);
        }
    };

    const handleAddOrUpdateOpcional = async () => {
        setIsLoading(true);
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            if (isEditing && opcionalToEditId) {
                // Atualizar opcional existente (PATCH)
                await axios.patch(`/empresas/${empresaId}/prateleiras/${categoriaId}/produtos/${produtoId}/adicionais/${opcionalToEditId}`, newOpcional);
                setOpcionais(opcionais.map(opcional => opcional.id === opcionalToEditId ? newOpcional : opcional));
            } else {
                // Adicionar novo opcional (POST)
                const response = await axios.post(`/empresas/${empresaId}/prateleiras/${categoriaId}/produtos/${produtoId}/adicionais`, newOpcional);
                setOpcionais([...opcionais, response.data]);
            }

            // Limpar o formulário
            setNewOpcional({ nome: '', valor: 0, descricao: '', qtd: 1 });
            setIsEditing(false); // Resetar o modo de edição
            setOpcionalToEditId(null); // Resetar o ID do opcional editado
        } catch (error) {
            console.error('Erro ao adicionar/atualizar opcional:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditOpcional = (opcional: Opcional) => {
        setNewOpcional(opcional);
        setIsEditing(true);
        setOpcionalToEditId(opcional.id || null); // Armazena o ID do opcional para edição
    };

    const handleDeleteOpcional = async (opcionalId: number) => {
        setIsLoading(true);
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            await axios.delete(`/empresas/${empresaId}/prateleiras/${categoriaId}/produtos/${produtoId}/adicionais/${opcionalId}`);
            setOpcionais(opcionais.filter(opcional => opcional.id !== opcionalId));
        } catch (error) {
            console.error('Erro ao excluir opcional:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dialog-overlay">
            <div className="bg-white p-6 rounded-lg shadow-lg flex w-2/3">
                {/* Coluna para adicionar/editar novo opcional */}
                <div className="w-1/2 pr-4">
                    <h3 className="text-lg font-bold mb-4">
                        {isEditing ? "Editar Opcional" : "Adicionar Novo Opcional"}
                    </h3>

                    <Input
                        placeholder="Nome do Opcional"
                        value={newOpcional.nome}
                        onChange={(e) => setNewOpcional({ ...newOpcional, nome: e.target.value })}
                        className="mb-4"
                    />
                    <Input
                        placeholder="Valor"
                        type="number"
                        value={newOpcional.valor}
                        onChange={(e) => setNewOpcional({ ...newOpcional, valor: parseFloat(e.target.value) })}
                        className="mb-4"
                    />
                    <Textarea
                        placeholder="Descrição"
                        value={newOpcional.descricao}
                        onChange={(e) => setNewOpcional({ ...newOpcional, descricao: e.target.value })}
                        className="mb-4"
                    />

                    <div className="flex gap-4 justify-center mt-4">
                        <Button onClick={handleAddOrUpdateOpcional} variant="orange" disabled={isLoading} className="w-full">
                            {isLoading ? (isEditing ? "Atualizando..." : "Adicionando...") : (isEditing ? "Salvar Alterações" : "Adicionar Opcional")}
                        </Button>
                        <Button variant="destructive" onClick={onClose}>
                            Fechar
                        </Button>
                    </div>
                </div>

                {/* Coluna para listar opcionais */}
                <div className="w-1/2 ml-4 shadow-2xl bg-orange-50">
                    <h3 className="text-lg text-slate-400 font-semibold my-4 text-center">Opcionais Existentes</h3>
                    <ul className="mt-4 p-4">
                        {opcionais.length === 0 ? (
                            <li className="text-center text-gray-500">Não há opcionais cadastrados para esse produto.</li>
                        ) : (
                            opcionais.map((opcional) => (
                                <li key={opcional.id} className="flex justify-between items-center mb-2 p-2 border-b border-gray-200">
                                    <div>
                                        <span className="block font-semibold">{opcional.nome}</span>
                                        <span className="text-sm text-gray-600 block">Valor: R$ {opcional.valor}</span>
                                        <span className="text-sm text-gray-600 block">{opcional.descricao}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="orangeLink"
                                            onClick={() => handleEditOpcional(opcional)}
                                            disabled={isLoading}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDeleteOpcional(opcional.id as number)}
                                            disabled={isLoading}
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DialogGerenciarOpcionais;
