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

interface Categoria {
    id: number;
    nomePrateleira: string;
    produtos: Produto[];
}

const CardapioPage: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
                const empresaId = empresaData.id;

                const response = await axios.get(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/prateleiras/${empresaId}`);
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
            const response = await axios.get(`https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/empresas/prateleiras/${empresaId}`);
            setCategorias(response.data.prateleiras);
        } catch (error) {
            console.error('Erro ao atualizar categorias:', error);
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default CardapioPage;
