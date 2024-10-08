"use client";
import React, { useState, useEffect } from 'react';
import axios from '@/app/axiosConfig';
import CategoriaCard from '@/components/categoria-card/categoria-card';
import { Button } from '@/components/ui/button';
import MenuCompleto from '@/components/menu-completo/menu-completo';
import { FaPlus } from "react-icons/fa6";
import { Footer } from '@/components/footer/footer';
import { Produto } from '@/types/types';
import DialogAddCategory from '@/components/dialog-add-categoria/dialog-add-categoria';
import DialogAddProduct from '@/components/dialog-add-produto/dialog-add-produto';
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import DialogAlertaConexao from '@/components/dialog-alerta-conexao/dialog-alerta-conexao';

interface Categoria {
    id: number;
    nomePrateleira: string;
    produtos: Produto[];
}

const CardapioPage: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMoving, setIsMoving] = useState(false); // Estado para indicar se o produto está sendo movido
    const [progress, setProgress] = useState(0);
    const [newProduct, setNewProduct] = useState<Produto | null>(null);
    const { toast } = useToast();
    const [isDialogAlertaOpen, setIsDialogAlertaOpen] = useState(false);

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

                const response = await axios.get(`/empresas/${empresaId}/prateleiras`);
                setCategorias(response.data.prateleiras);
            } catch (error) {
                toast({
                    title: "Erro ao buscar categorias",
                    description: (error as Error).message || "Ocorreu um erro ao buscar as categorias.",
                    variant: "destructive",
                    duration: 5000,
                });
            } finally {
                setIsLoading(false);
            }
        };

        const simulateProgress = () => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return Math.min(prevProgress + 99.9, 100);
                }
                return prevProgress;
            });
        };

        fetchCategorias();

        const interval = setInterval(simulateProgress, 1000);

        return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
    }, []);

    useEffect(() => {
        const conexaoHabilitada = localStorage.getItem("conexaoHabilitada") === "true";
        if (!conexaoHabilitada) {
            setIsDialogAlertaOpen(true);
        }
    }, []);

    const handleProductEdit = (produto: Produto) => {
        setNewProduct(produto);
        setIsEditDialogOpen(true);
    };

    const handleProductDelete = async (produto: Produto, prateleiraId: number) => {
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            await axios.delete(`/empresas/${empresaId}/prateleiras/${prateleiraId}/produtos/${produto.id}`);
            toast({
                title: "Produto excluído com sucesso!",
                variant: "success",
                duration: 3000,

            });
            handleAddCategory();
        } catch (error) {
            toast({
                title: "Erro ao excluir produto",
                description: "Ocorreu um erro ao tentar excluir o produto.",
                variant: "destructive",
                duration: 5000,
            });
        }
    };

    const handleAddCategory = async () => {
        try {
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;
            const response = await axios.get(`/empresas/${empresaId}/prateleiras`);
            setCategorias(response.data.prateleiras);
        } catch (error) {
            toast({
                title: "Erro ao atualizar categorias",
                description: (error as Error).message || "Ocorreu um erro ao tentar atualizar as categorias.",
                variant: "destructive",
                duration: 5000,
            });
        }
    };

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        const produtoId = active.id;
        const novaCategoriaId = over.id.replace("categoria-", "");

        // Encontra a categoria de origem do produto
        const categoriaOrigem = categorias.find(categoria =>
            categoria.produtos.some(produto => produto.id.toString() === produtoId)
        );

        // Se o produto foi solto na mesma categoria, não faz nada
        if (categoriaOrigem && categoriaOrigem.id.toString() === novaCategoriaId) {
            return;
        }

        setIsMoving(true);
        toast({
            title: "Movendo produto...",
            description: "Por favor, aguarde.",
            variant: "loading",
            duration: 5000,
        });

        const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
        const empresaId = empresaData.id;

        try {
            // Faz o PATCH para mover o produto para a nova categoria
            await axios.patch(`/empresas/${empresaId}/prateleiras/${categoriaOrigem?.id}/produtos/${produtoId}/prateleira/${novaCategoriaId}`);

            toast({
                title: "Produto movido com sucesso!",
                variant: "success",
                duration: 3000,
            });
            handleAddCategory(); // Atualiza as categorias após o movimento
        } catch (error) {
            toast({
                title: "Erro ao mover produto",
                description: (error as Error).message || "Ocorreu um erro ao tentar mover o produto.",
                variant: "destructive",
                duration: 5000,
            });
        } finally {
            setIsMoving(false);
        }
    };


    return (
        <div className="flex flex-col min-h-screen relative">
            {isMoving && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <p className="text-white text-lg">Movendo produto...</p>
                </div>
            )}
            <div className={`flex-grow ${isMoving ? 'pointer-events-none' : ''}`}>
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <MenuCompleto />
                    <div className="p-6 flex-grow">
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
                        {isLoading && progress < 100 ? (
                            <div>
                                <p>Carregando suas categorias...</p>
                            </div>
                        ) : categorias.length === 0 ? (
                            <p>Nenhuma categoria encontrada.</p>
                        ) : (
                            categorias.map((categoria) => (
                                <CategoriaCard
                                    key={categoria.id}
                                    categoriaId={categoria.id.toString()}
                                    categoriaNome={categoria.nomePrateleira}
                                    produtos={categoria.produtos}
                                    onProductEdit={handleProductEdit}
                                    onProductDelete={(produto) => handleProductDelete(produto, categoria.id)}
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
                        {isEditDialogOpen && newProduct && (
                            <DialogAddProduct
                                onClose={() => setIsEditDialogOpen(false)}
                                onProductAdded={handleAddCategory}
                                productToEdit={newProduct}
                                categoriaId={categorias.find(c => c.produtos.some(p => p.id === newProduct.id))?.id || 0}
                            />
                        )}
                    </div>
                </DndContext>
            </div>

            <DialogAlertaConexao
                isOpen={isDialogAlertaOpen}
                onClose={() => setIsDialogAlertaOpen(false)}
                title="ATENÇÃO!"
                description="O recebimento de pedidos está desabilitado, portanto você não será notificado sobre novos pedidos. Habilite-o no interruptor localizado no canto superior direito da página de pedidos."
                showSwitch={false}
            />

            <Footer />
        </div>
    );
};

export default CardapioPage
