import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from '@/app/axiosConfig';
import { useToast } from '@/components/ui/use-toast';
import DialogConfirmDelete from "@/components/dialog-confirm-delete/dialog-confirm-delete";

interface DialogDeleteCategoryProps {
    categoriaId: string;
    categoriaNome: string;
    onClose: () => void;
    onCategoryUpdated: () => void;
}

const DialogDeleteCategory: React.FC<DialogDeleteCategoryProps> = ({
    categoriaId,
    categoriaNome,
    onClose,
    onCategoryUpdated,
}) => {
    const [isDeleting, setIsDeleting] = useState(false); // Para controlar o estado de exclusão
    const { toast } = useToast(); // Hook de toast para exibir mensagens

    const handleDeleteCategory = async () => {
        try {
            setIsDeleting(true); // Inicia o estado de exclusão
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            if (!categoriaId || !empresaId) {
                toast({
                    title: "Erro",
                    description: "ID da categoria ou empresa inválido.",
                    variant: "destructive",
                    duration: 5000,
                });
                setIsDeleting(false);
                return;
            }

            // Faz a requisição de exclusão para o endpoint correto
            await axios.delete(`/empresas/${empresaId}/prateleiras/${categoriaId}`);

            toast({
                title: "Categoria excluída com sucesso!",
                description: `A categoria "${categoriaNome}" foi removida.`,
                variant: "success",
                duration: 5000,
            });

            onCategoryUpdated(); // Atualiza as categorias após exclusão
            onClose();
        } catch (error: any) {
            toast({
                title: "Erro ao excluir categoria",
                description: error.message || "Ocorreu um erro ao tentar excluir a categoria.",
                variant: "destructive",
                duration: 5000,
            });
        } finally {
            setIsDeleting(false); // Finaliza o estado de exclusão
        }
    };

    return (
        <DialogConfirmDelete
            message={`Tem certeza que deseja excluir a categoria "${categoriaNome}"?`}
            onConfirm={handleDeleteCategory} // Executa a exclusão
            onCancel={onClose} // Fecha o diálogo se o usuário cancelar
            isDeleting={isDeleting} // Passa o estado de exclusão para o componente de diálogo
        />
    );
};

export default DialogDeleteCategory;
