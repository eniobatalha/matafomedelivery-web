import React from "react";
import { Button } from "@/components/ui/button";
import { Produto } from "@/types/types";

interface DialogDetalhesProdutoProps {
    produto: Produto;
    isOpen: boolean;
    onClose: () => void;
}

const DialogDetalhesProduto: React.FC<DialogDetalhesProdutoProps> = ({ produto, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dialog-overlay">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Detalhes do Produto</h3>
                <img src={produto.urlImagem} alt={produto.descricao} className="w-48 h-48 object-cover mb-4" />
                <p className="text-lg font-bold">{produto.nome}</p>
                <p className="text-sm text-gray-600">{produto.descricao}</p>
                <p className="text-sm text-gray-600">Preço Unitário: R${produto.preco}</p>
                <Button onClick={onClose} variant="destructive" className="mt-4">Fechar</Button>
            </div>
        </div>
    );
};

export default DialogDetalhesProduto;
