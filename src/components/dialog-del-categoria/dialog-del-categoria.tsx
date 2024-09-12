import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from '@/app/axiosConfig';
import { Input } from '../ui/input';
import { useToast } from '@/components/ui/use-toast';  // Importando o hook de toast

interface DialogEditCategoryProps {
    categoriaId: string;
    categoriaNome: string;
    onClose: () => void;
    onCategoryUpdated: () => void;
}

const DialogEditCategory: React.FC<DialogEditCategoryProps> = ({ categoriaId, categoriaNome, onClose, onCategoryUpdated }) => {
    const [categoriaNomeEdit, setCategoriaNomeEdit] = useState(categoriaNome);
    const [isSaving, setIsSaving] = useState(false); // Estado para controlar o salvamento
    const { toast } = useToast(); // Inicializando o hook de toast

    const handleEditCategory = async () => {
        try {
            setIsSaving(true); // Inicia o estado de salvamento
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            if (!categoriaId || !empresaId) {
                toast({
                    title: "Erro",
                    description: "ID da categoria ou empresa inválido.",
                    variant: "destructive",
                    duration: 5000,
                });
                setIsSaving(false);
                return;
            }

            const url = `/empresas/${empresaId}/prateleiras/${categoriaId}`;

            await axios.put(url, {
                id: Number(categoriaId),
                nomePrateleira: categoriaNomeEdit,
                produtos: [], // Supondo que os produtos sejam atualizados separadamente
            });

            toast({
                title: "Sucesso",
                description: `Categoria "${categoriaNomeEdit}" foi atualizada com sucesso.`,
                variant: "success",
                duration: 5000,
            });

            onCategoryUpdated();
            onClose();
        } catch (error: any) {
            toast({
                title: "Erro ao editar categoria",
                description: error.message || "Ocorreu um erro ao tentar editar a categoria.",
                variant: "destructive",
                duration: 5000,
            });
        } finally {
            setIsSaving(false); // Finaliza o estado de salvamento
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dialog-overlay">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Editar Categoria</h3>
                <Input
                    value={categoriaNomeEdit}
                    onChange={(e) => setCategoriaNomeEdit(e.target.value)}
                    placeholder="Nome da Categoria"
                    className="mb-4"
                    disabled={isSaving} // Desabilita o input enquanto está salvando
                />
                <div className="flex gap-4">
                    <Button onClick={handleEditCategory} variant="orange" disabled={isSaving}>
                        {isSaving ? "Salvando..." : "Salvar"}
                    </Button>
                    <Button onClick={onClose} variant="destructive" disabled={isSaving}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DialogEditCategory;
