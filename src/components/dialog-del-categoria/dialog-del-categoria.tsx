import React from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';

interface DialogDeleteCategoryProps {
    categoriaId: string;
    categoriaNome: string;
    onClose: () => void;
    onCategoryDeleted: () => void;
}

const DialogDeleteCategory: React.FC<DialogDeleteCategoryProps> = ({ categoriaId, categoriaNome, onClose, onCategoryDeleted }) => {
    const handleDeleteCategory = async () => {
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            if (!categoriaId || !empresaId) {
                console.error('ID da categoria ou empresa inválido');
                return;
            }

            await axios.delete(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/${empresaId}/prateleiras/${categoriaId}`);
            onCategoryDeleted();  // Atualize a lista de categorias
            onClose();  // Feche o diálogo
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Excluir Categoria</h3>
                <p>Tem certeza de que deseja excluir a categoria &quot;{categoriaNome}&quot;?</p>
                <div className="flex gap-4 mt-4">
                    <Button onClick={handleDeleteCategory} variant="destructive">Excluir</Button>
                    <Button onClick={onClose} variant="orange">Cancelar</Button>
                </div>
            </div>
        </div>
    );
};

export default DialogDeleteCategory;
