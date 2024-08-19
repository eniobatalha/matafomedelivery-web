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
            await axios.delete(`http://localhost:3001/categoria/${categoriaId}`);
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
