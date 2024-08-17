"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaEllipsisV } from "react-icons/fa";

interface ProdutoCategoriaProps {
    onEdit: () => void;
    onDelete: () => void;
}

const ProdutoCategoria: React.FC<ProdutoCategoriaProps> = ({ onEdit, onDelete }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="transparentOrange" className="p-1">
                    <FaEllipsisV className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem onClick={onEdit} className="hover:bg-orange-500 hover:text-white">
                    Editar Produto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="hover:bg-orange-500 hover:text-white">
                    Excluir Produto
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProdutoCategoria;
