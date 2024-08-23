import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import DialogEditCategory from "@/components/dialog-edit-categoria/dialog-edit-categoria";
import DialogDeleteCategory from "@/components/dialog-del-categoria/dialog-del-categoria";
import { Produto } from '@/types/types';

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
    const [newProduct, setNewProduct] = useState({
        image: '',
        description: '',
        unitPrice: '',
        additions: [''],
    });
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleOpenDetailDialog = (produto: Produto) => {
        setSelectedProduct(produto);
        setIsDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setIsDetailDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleOpenAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false);
        setNewProduct({
            image: '',
            description: '',
            unitPrice: '',
            additions: [''],
        });
    };

    const handleOpenEditDialog = () => {
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleOpenDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setNewProduct({
            ...newProduct,
            [field]: e.target.value,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewProduct({
                    ...newProduct,
                    image: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddAddition = () => {
        setNewProduct({
            ...newProduct,
            additions: [...newProduct.additions, ''],
        });
    };

    const handleChangeAddition = (index: number, value: string) => {
        const updatedAdditions = [...newProduct.additions];
        updatedAdditions[index] = value;
        setNewProduct({
            ...newProduct,
            additions: updatedAdditions,
        });
    };

    return (
        <Card className="border border-gray-300 rounded-lg mb-4">
            <CardHeader className="bg-orange-100 flex flex-row justify-between">
                <h2 className="text-xl font-bold">{categoriaNome}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="transparentOrange" className="p-1">
                            <GiHamburgerMenu className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuItem
                            onClick={() => handleOpenEditDialog()}
                            className="hover:bg-orange-500 hover:text-white"
                        >
                            Editar Categoria
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleOpenDeleteDialog()}
                            className="hover:bg-orange-500 hover:text-white"
                        >
                            Excluir Categoria
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                {produtos.map((produto, index) => (
                    <div key={index} className="flex items-center justify-between mb-2 p-2 border-b border-gray-300">
                        <div className="flex items-center">
                            <img src={produto.image} alt={produto.description} className="w-24 h-24 object-cover mr-4" />
                            <div className="flex flex-col items-start">
                                <p className="font-bold">{produto.description}</p>
                                <p className="text-sm text-gray-600">R${produto.unitPrice}</p>
                                <Button onClick={() => handleOpenDetailDialog(produto)} variant="outline">Detalhes</Button>
                            </div>
                        </div>
                        <Button onClick={() => onProductDelete(produto)} variant="destructive">Excluir</Button>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={handleOpenAddDialog} variant="orange">
                    <FaPlus className="h-5 w-5 mr-2" />
                    Adicionar Produto
                </Button>
            </CardFooter>

            {/* Dialog de Edição de Categoria */}
            {isEditDialogOpen && (
                <DialogEditCategory
                    categoriaId={categoriaId}
                    categoriaNome={categoriaNome}
                    onClose={handleCloseEditDialog}
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

            {/* Dialog de Adição de Produto */}
            {isAddDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Adicionar Produto</h3>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mb-4"
                        />
                        <Input
                            value={newProduct.description}
                            onChange={(e) => handleChange(e, 'description')}
                            placeholder="Descrição do Produto"
                            className="mb-4"
                        />
                        <Input
                            value={newProduct.unitPrice}
                            onChange={(e) => handleChange(e, 'unitPrice')}
                            placeholder="Preço Unitário"
                            className="mb-4"
                        />
                        {newProduct.additions.map((addition, index) => (
                            <Input
                                key={index}
                                value={addition}
                                onChange={(e) => handleChangeAddition(index, e.target.value)}
                                placeholder={`Adição ${index + 1}`}
                                className="mb-2"
                            />
                        ))}
                        <Button onClick={handleAddAddition} variant="outline">Adicionar Adição</Button>
                        <div className="flex gap-4 mt-4">
                            <Button onClick={handleCloseAddDialog} variant="orange">Salvar</Button>
                            <Button onClick={handleCloseAddDialog} variant="destructive">Cancelar</Button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Dialog de Detalhes do Produto */}
            {isDetailDialogOpen && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Detalhes do Produto</h3>
                        <img src={selectedProduct.image} alt={selectedProduct.description} className="w-48 h-48 object-cover mb-4" />
                        <p className="text-lg font-bold">{selectedProduct.description}</p>
                        <p className="text-sm text-gray-600">Preço Unitário: R${selectedProduct.unitPrice}</p>
                        <Button onClick={handleCloseDetailDialog} variant="destructive" className="mt-4">Fechar</Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default CategoriaCard;
