"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoriaCard from '@/components/categoria-card/categoria-card';
import { Button } from '@/components/ui/button';
import MenuCompleto from '@/components/menu-completo/menu-completo';
import { FaPlus } from "react-icons/fa6";
import { Footer } from '@/components/footer/footer';
import { Produto } from '@/types/types';
import DialogAddCategory from '@/components/dialog-add-categoria/dialog-add-categoria';
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useToast } from "@/components/ui/use-toast";

interface Categoria {
    id: number;
    nomePrateleira: string;
    produtos: Produto[];
}

const CardapioPage: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
                const empresaId = empresaData.id;

                const response = await axios.get(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/${empresaId}/prateleiras`);
                setCategorias(response.data.prateleiras);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleProductEdit = (produto: Produto) => {
        console.log('Editar produto:', produto);
    };

    const handleProductDelete = (produto: Produto) => {
        console.log('Deletar produto:', produto);
    };

    const handleAddCategory = async () => {
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;
            const response = await axios.get(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/${empresaId}/prateleiras`);
            setCategorias(response.data.prateleiras);
        } catch (error) {
            console.error('Erro ao atualizar categorias:', error);
        }
    };

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const produtoId = active.id;
            const novaCategoriaId = over.id.replace("categoria-", "");
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            try {
                // Obter dados do produto existente
                const getProdutoResponse = await axios.get(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/${empresaId}/prateleiras/${produtoId}/produtos/${produtoId}`);
                const produto = getProdutoResponse.data;

                // Criar o produto na nova categoria
                await axios.post(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/${empresaId}/prateleiras/${novaCategoriaId}/produtos`, {
                    nome: produto.nome,
                    preco: produto.preco,
                    descricao: produto.descricao,
                    urlImagem: produto.urlImagem
                });

                // Deletar o produto da categoria original
                await axios.delete(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/${empresaId}/prateleiras/${produtoId}/produtos/${produtoId}`);

                toast({
                    title: "Produto movido com sucesso!",
                    variant: "success",
                });
                handleAddCategory(); // Atualiza as categorias
            } catch (error) {
                console.error('Erro ao mover produto:', error);
                toast({
                    title: "Erro ao mover produto",
                    description: "Ocorreu um erro ao tentar mover o produto.",
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <MenuCompleto />
            <div className="p-6">
                <div className="flex items-center justify-between my-4">
                    <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
                    <Button
                        variant="outlineOrange"
                        className="flex items-center gap-2"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <FaPlus className="h-5 w-5" />
                        Adicionar Categoria
                    </Button>
                </div>
                {categorias.length === 0 ? (
                    <p>Nenhuma categoria encontrada.</p>
                ) : (
                    categorias.map((categoria) => (
                        <CategoriaCard
                            key={categoria.id}
                            categoriaId={categoria.id.toString()}
                            categoriaNome={categoria.nomePrateleira}
                            produtos={categoria.produtos}
                            onProductEdit={handleProductEdit}
                            onProductDelete={handleProductDelete}
                            onCategoryUpdated={handleAddCategory}
                        />
                    ))
                )}
                {isDialogOpen && (
                    <DialogAddCategory
                        onClose={() => setIsDialogOpen(false)}
                        onCategoryAdded={handleAddCategory}
                    />
                )}
            </div>
            <Footer />
        </DndContext>
    );
};

export default CardapioPage;
