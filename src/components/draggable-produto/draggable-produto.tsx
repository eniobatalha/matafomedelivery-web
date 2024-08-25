import React from 'react';
import { useDraggable } from "@dnd-kit/core";
import { Produto } from '@/types/types';
import { Button } from "@/components/ui/button";

interface DraggableProdutoProps {
    produto: Produto;
    onProductDelete: (produto: Produto) => void;
    onDetailClick: (produto: Produto) => void;
}

const DraggableProduto: React.FC<DraggableProdutoProps> = ({ produto, onProductDelete, onDetailClick }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: produto.id.toString(),
    });

    const draggableStyle = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
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
            <Button onClick={() => onProductDelete(produto)} variant="destructive">Excluir</Button>
        </div>
    );
};

export default DraggableProduto;
