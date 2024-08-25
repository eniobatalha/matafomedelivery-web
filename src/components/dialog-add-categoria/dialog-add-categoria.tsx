import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from '@/app/axiosConfig';
import { Input } from '../ui/input';

interface DialogAddCategoryProps {
    onClose: () => void;
    onCategoryAdded: () => void;
}

const DialogAddCategory: React.FC<DialogAddCategoryProps> = ({ onClose, onCategoryAdded }) => {
    const [categoriaNome, setCategoriaNome] = useState('');

    const handleAddCategory = async () => {
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            await axios.post(`/empresas/${empresaId}/prateleiras`, {
                nomePrateleira: categoriaNome,
            });
            onCategoryAdded();  // Atualize a lista de categorias
            onClose();  // Feche o diálogo
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Adicionar Nova Categoria</h3>
                <Input
                    value={categoriaNome}
                    onChange={(e) => setCategoriaNome(e.target.value)}
                    placeholder="Nome da Categoria"
                    className="mb-4"
                />
                <div className="flex gap-4">
                    <Button onClick={handleAddCategory} variant="orange">Adicionar</Button>
                    <Button onClick={onClose} variant="destructive">Cancelar</Button>
                </div>
            </div>
        </div>
    );
};

export default DialogAddCategory;
