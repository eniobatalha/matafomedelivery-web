import React, { useState } from 'react';
import { useDraggable } from "@dnd-kit/core";
import { Produto } from '@/types/types';
import { Button } from "@/components/ui/button";
import DialogConfirmDelete from '@/components/dialog-confirm-delete/dialog-confirm-delete';

interface DraggableProdutoProps {
    produto: Produto;
    onProductDelete: (produto: Produto) => void;
    onDetailClick: (produto: Produto) => void;
    onEditClick: (produto: Produto) => void;
}

const DraggableProduto: React.FC<DraggableProdutoProps> = ({ produto, onProductDelete, onDetailClick, onEditClick }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: produto.id.toString(),
    });

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const draggableStyle = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleDeleteClick = () => {
        setIsConfirmDialogOpen(true); // Abre o diálogo de confirmação
    };

    const handleConfirmDelete = () => {
        setIsConfirmDialogOpen(false);
        onProductDelete(produto); // Executa a exclusão após a confirmação
    };

    const handleCancelDelete = () => {
        setIsConfirmDialogOpen(false); // Fecha o diálogo de confirmação
    };

    return (
        <div
            ref={setNodeRef}
            style={draggableStyle}
            {...listeners}
            {...attributes}
            className="flex items-center justify-between mb-2 p-2 border-b border-gray-300"
        >
            <div className="flex items-center">
                <img src={produto.urlImagem} alt={produto.descricao} className="w-24 h-24 object-cover mr-4" />
                <div className="flex flex-col items-start">
                    <p className="font-bold">{produto.nome}</p>
                    <p className="text-sm text-gray-600">{produto.descricao}</p>
                    <p className="text-sm text-gray-600">R${produto.preco}</p>
                    <Button onClick={() => onDetailClick(produto)} variant="outline">Detalhes</Button>
                </div>
            </div>
            <div className='flex gap-4'>
                <Button onClick={() => onEditClick(produto)} variant="outlineOrange">Editar</Button>
                <Button onClick={handleDeleteClick} variant="destructive">Excluir</Button>
            </div>

            {isConfirmDialogOpen && (
                <DialogConfirmDelete
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    message={`Tem certeza que deseja excluir o produto "${produto.nome}"?`}
                />
            )}
        </div>
    );
};

export default DraggableProduto;
