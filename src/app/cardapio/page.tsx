"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoriaCard from '@/components/categoria-card/categoria-card';
import { Button } from '@/components/ui/button';
import MenuCompleto from '@/components/menu-completo/menu-completo';
import { FaPlus } from "react-icons/fa6";
import { Footer } from '@/components/footer/footer';
import { Produto } from '@/types/types';
import DialogAddCategory from '@/components/dialog-add-categoria/dialog-add-categoria';  // Importe o novo componente de diálogo

interface Categoria {
    id: string;
    categoriaNome: string;
    produtos: Produto[];
}

const CardapioPage: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3001/categoria');
                setCategorias(response.data);
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
            const response = await axios.get('http://localhost:3001/categoria');
            setCategorias(response.data);
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
                {categorias.map((categoria) => (
                    <CategoriaCard
                    key={categoria.id}
                    categoriaNome={categoria.categoriaNome}
                    produtos={categoria.produtos}
                    onProductEdit={handleProductEdit}
                    onProductDelete={handleProductDelete} onCategoryUpdated={function (): void {
                      throw new Error('Function not implemented.');
                    } } categoriaId={''}                    />
                ))}
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
