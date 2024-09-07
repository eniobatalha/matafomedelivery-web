import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DialogEditCategory from "@/components/dialog-edit-categoria/dialog-edit-categoria";
import DialogDeleteCategory from "@/components/dialog-del-categoria/dialog-del-categoria";
import { Produto } from '@/types/types';
import { useDroppable } from "@dnd-kit/core";
import DraggableProduto from "@/components/draggable-produto/draggable-produto";
import DialogAddProduct from "@/components/dialog-add-produto/dialog-add-produto";

interface CategoriaCardProps {
    categoriaId: string;
    categoriaNome: string;
    produtos: Produto[];
    onProductEdit: (produto: Produto) => void;
    onProductDelete: (produto: Produto) => void;
    onCategoryUpdated: () => void;
}

const CategoriaCard: React.FC<CategoriaCardProps> = ({
    categoriaId,
    categoriaNome,
    produtos,
    onProductEdit,
    onProductDelete,
    onCategoryUpdated,
}) => {
    const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Para editar o produto
    const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false); // Para editar a categoria
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { isOver, setNodeRef } = useDroppable({
        id: `categoria-${categoriaId}`,
    });

    const cardStyle = {
        backgroundColor: isOver ? "#fecaca" : "white",
    };

    const handleOpenDetailDialog = (produto: Produto) => {
        setSelectedProduct(produto);
        setIsDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setIsDetailDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleOpenAddDialog = () => {
        setSelectedProduct(null);
        setIsAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const handleOpenEditDialog = (produto: Produto) => {
        setSelectedProduct(produto);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleOpenEditCategoryDialog = () => {
        setIsEditCategoryDialogOpen(true);
    };

    const handleCloseEditCategoryDialog = () => {
        setIsEditCategoryDialogOpen(false);
    };

    const handleOpenDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <Card ref={setNodeRef} style={cardStyle} className="border border-gray-100 rounded-lg mb-4 shadow-lg">
            <CardHeader className="bg-orange-200 flex flex-row justify-between">
                <h2 className="text-xl font-bold">{categoriaNome}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="transparentOrange" className="p-1">
                            <GiHamburgerMenu className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuItem
                            onClick={handleOpenEditCategoryDialog} // Agora abre o diálogo de edição de categoria
                            className="hover:bg-orange-500 hover:text-white"
                        >
                            Editar Categoria
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleOpenDeleteDialog}
                            className="hover:bg-orange-500 hover:text-white"
                        >
                            Excluir Categoria
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                {produtos.map((produto) => (
                    <DraggableProduto 
                        key={produto.id} 
                        produto={produto} 
                        onProductDelete={() => onProductDelete(produto)} 
                        onDetailClick={() => handleOpenDetailDialog(produto)} 
                        onEditClick={() => handleOpenEditDialog(produto)} // Adiciona a opção de editar
                    />
                ))}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={handleOpenAddDialog} variant="orange">
                    <FaPlus className="h-5 w-5 mr-2" />
                    Adicionar Produto
                </Button>
            </CardFooter>

            {/* Dialog de Adição de Produto */}
            {isAddDialogOpen && (
                <DialogAddProduct
                    onClose={handleCloseAddDialog}
                    onProductAdded={onCategoryUpdated}
                    categoriaId={parseInt(categoriaId, 10)}
                />
            )}

            {/* Dialog de Edição de Produto */}
            {isEditDialogOpen && selectedProduct && (
                <DialogAddProduct
                    onClose={handleCloseEditDialog}
                    onProductAdded={onCategoryUpdated}
                    productToEdit={selectedProduct}
                    categoriaId={parseInt(categoriaId, 10)}
                />
            )}

            {/* Dialog de Edição de Categoria */}
            {isEditCategoryDialogOpen && (
                <DialogEditCategory
                    categoriaId={categoriaId}
                    categoriaNome={categoriaNome}
                    onClose={handleCloseEditCategoryDialog}
                    onCategoryUpdated={onCategoryUpdated}
                />
            )}

            {/* Dialog de Exclusão de Categoria */}
            {isDeleteDialogOpen && (
                <DialogDeleteCategory
                    categoriaId={categoriaId}
                    categoriaNome={categoriaNome}
                    onClose={handleCloseDeleteDialog}
                    onCategoryDeleted={onCategoryUpdated}
                />
            )}

            {/* Dialog de Detalhes do Produto */}
            {isDetailDialogOpen && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dialog-overlay">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Detalhes do Produto</h3>
                        <img src={selectedProduct.urlImagem} alt={selectedProduct.descricao} className="w-48 h-48 object-cover mb-4" />
                        <p className="text-lg font-bold">{selectedProduct.nome}</p>
                        <p className="text-sm text-gray-600">{selectedProduct.descricao}</p>
                        <p className="text-sm text-gray-600">Preço Unitário: R${selectedProduct.preco}</p>
                        <Button onClick={handleCloseDetailDialog} variant="destructive" className="mt-4">Fechar</Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default CategoriaCard;
