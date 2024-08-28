import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from '@/app/axiosConfig';

interface DialogDeleteCategoryProps {
    categoriaId: string;
    categoriaNome: string;
    onClose: () => void;
    onCategoryDeleted: () => void;
}

const DialogDeleteCategory: React.FC<DialogDeleteCategoryProps> = ({ categoriaId, categoriaNome, onClose, onCategoryDeleted }) => {
    const [isDeleting, setIsDeleting] = useState(false); // Estado para controlar o carregamento

    const handleDeleteCategory = async () => {
        try {
            setIsDeleting(true); // Inicia o estado de carregamento
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            if (!categoriaId || !empresaId) {
                console.error('ID da categoria ou empresa inválido');
                setIsDeleting(false);
                return;
            }

            await axios.delete(`/empresas/${empresaId}/prateleiras/${categoriaId}`);
            onCategoryDeleted();  // Atualize a lista de categorias
            onClose();  // Feche o diálogo
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        } finally {
            setIsDeleting(false); // Encerra o estado de carregamento
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dialog-overlay">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Excluir Categoria</h3>
                <p>Tem certeza de que deseja excluir a categoria &quot;{categoriaNome}&quot;?</p>
                <div className="flex gap-4 mt-4">
                    <Button onClick={handleDeleteCategory} variant="destructive" disabled={isDeleting}>
                        {isDeleting ? "Excluindo..." : "Excluir"}
                    </Button>
                    <Button onClick={onClose} variant="orange" disabled={isDeleting}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DialogDeleteCategory;
