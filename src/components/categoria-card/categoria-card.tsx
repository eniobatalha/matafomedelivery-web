"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogOverlay,
    DialogHeader,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Produto {
    image: string;
    description: string;
    unitPrice: string;
    totalPrice: string;
    additions: string[];
}

interface CategoriaCardProps {
    categoriaNome: string;
    produtos: Produto[];
    onProductEdit: (produto: Produto) => void;
    onProductDelete: (produto: Produto) => void;
}

const CategoriaCard: React.FC<CategoriaCardProps> = ({
    categoriaNome,
    produtos,
    onProductEdit,
    onProductDelete,
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
                        <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
                            Editar Categoria
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
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
                                <p className="font-semibold">{produto.description}</p>
                                <Button variant="orangeLink" className="text-gray-500" onClick={() => handleOpenDetailDialog(produto)}>
                                    Ver detalhes
                                </Button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">{produto.unitPrice}</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="transparentOrange" className="p-1">
                                        <GiHamburgerMenu className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48" align="end" forceMount>
                                    <DropdownMenuItem
                                        onClick={() => onProductEdit(produto)}
                                        className="hover:bg-orange-500 hover:text-white"
                                    >
                                        Editar Produto
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => onProductDelete(produto)}
                                        className="hover:bg-orange-500 hover:text-white"
                                    >
                                        Excluir Produto
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-start">
                <Button variant="orange" className="gap-2" onClick={handleOpenAddDialog}>
                    <FaPlus className="h-5 w-5" />
                    Adicionar produto
                </Button>
            </CardFooter>

            {/* Componente Dialog para Detalhes do Produto */}
            {selectedProduct && (
                <Dialog open={isDetailDialogOpen} onOpenChange={handleCloseDetailDialog}>
                    <DialogOverlay />
                    <DialogContent className="w-2/3">
                        <DialogHeader>
                            <DialogTitle>Detalhes do Produto</DialogTitle>
                            <DialogDescription>
                                {selectedProduct.description}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <img src={selectedProduct.image} alt={selectedProduct.description} className="w-48 h-48 object-cover mb-4" />
                            <p className="text-sm text-gray-500 font-bold">Preço unitário: {selectedProduct.unitPrice}</p>
                            <p className="text-sm text-gray-500 font-bold">Adicionais:</p>
                            <ul className="list-disc pl-5">
                                {(selectedProduct.additions || []).map((addition, index) => (
                                    <li key={index} className="text-sm text-gray-500">{addition}</li>
                                ))}
                            </ul>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCloseDetailDialog} variant="destructive">
                                Fechar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Componente Dialog para Adicionar Novo Produto */}
            <Dialog open={isAddDialogOpen} onOpenChange={handleCloseAddDialog}>
                <DialogOverlay />
                <DialogContent className="max-h-screen max-w-screen-lg">
                    <div className="flex space-x-4">
                        <div className="w-1/2 p-4 border-r border-gray-300">
                            <DialogHeader>
                                <DialogTitle className="mb-4 text-orange-500">Informações do Produto</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label>Nome</Label>
                                    <Input
                                        type="text"
                                        value={newProduct.description}
                                        onChange={(e) => handleChange(e, "description")}
                                    />
                                </div>
                                <div>
                                    <Label>Imagem</Label>
                                    <Input
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                <div>
                                    <Label>Preço Unitário</Label>
                                    <Input
                                        type="text"
                                        value={newProduct.unitPrice}
                                        onChange={(e) => handleChange(e, "unitPrice")}
                                    />
                                </div>
                                <div>
                                    <Label>Adicionais</Label>
                                    <div className="max-h-40 overflow-y-auto">
                                        {newProduct.additions.map((addition, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                <Input
                                                    type="text"
                                                    value={addition}
                                                    onChange={(e) => handleChangeAddition(index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={handleAddAddition}
                                        variant="outline"
                                        className="mt-2"
                                    >
                                        + Adicionais
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 p-4">
                            <DialogHeader>
                                <DialogTitle className="mb-4 text-orange-500">Visualização</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="flex justify-center items-center">
                                    {newProduct.image ? (
                                        <img src={newProduct.image} alt="Product Preview" className="w-1/3 h-1/3 object-cover" />
                                    ) : (
                                        <p className="text-gray-500">Nenhuma imagem selecionada</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Nome:</p>
                                    <p className="text-gray-700">{newProduct.description || "Nenhuma descrição fornecida"}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Preço Unitário:</p>
                                    <p className="text-gray-700">{'R$ '+ newProduct.unitPrice || "Nenhum preço fornecido"}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Adicionais:</p>
                                    {newProduct.additions.length > 0 ? (
                                        <ul className="list-disc pl-5 text-gray-700">
                                            {newProduct.additions.map((addition, index) => (
                                                <li key={index}>{addition}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">Nenhum adicional fornecido</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCloseAddDialog} variant="destructive">
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                console.log("Novo produto adicionado:", newProduct);
                                handleCloseAddDialog();
                            }}
                            variant="orange"
                        >
                            Adicionar Produto
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </Card>
    );
};

export default CategoriaCard;
