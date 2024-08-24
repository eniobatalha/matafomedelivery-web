import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Input } from '../ui/input';

interface DialogEditCategoryProps {
    categoriaId: string;
    categoriaNome: string;
    onClose: () => void;
    onCategoryUpdated: () => void;
}

const DialogEditCategory: React.FC<DialogEditCategoryProps> = ({ categoriaId, categoriaNome, onClose, onCategoryUpdated }) => {
    const [categoriaNomeEdit, setCategoriaNomeEdit] = useState(categoriaNome);

    const handleEditCategory = async () => {
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            if (!categoriaId || !empresaId) {
                console.error('ID da categoria ou empresa inválido');
                return;
            }

            const url = `https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/${empresaId}/prateleiras/${categoriaId}`;

            await axios.put(url, {
                id: Number(categoriaId),
                nomePrateleira: categoriaNomeEdit,
                produtos: [], // Supondo que os produtos sejam atualizados separadamente
            });

            onCategoryUpdated();
            onClose();
        } catch (error) {
            console.error('Erro ao editar categoria:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Editar Categoria</h3>
                <Input
                    value={categoriaNomeEdit}
                    onChange={(e) => setCategoriaNomeEdit(e.target.value)}
                    placeholder="Nome da Categoria"
                    className="mb-4"
                />
                <div className="flex gap-4">
                    <Button onClick={handleEditCategory} variant="orange">Salvar</Button>
                    <Button onClick={onClose} variant="destructive">Cancelar</Button>
                </div>
            </div>
        </div>
    );
};

export default DialogEditCategory;
