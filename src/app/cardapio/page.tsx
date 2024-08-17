"use client";
import React from 'react';
import CategoriaCard from '@/components/categoria-card/categoria-card';
import CategoriaCardProps from '@/components/categoria-card/categoria-card';

interface ExtendedCategoriaCardProps extends CategoriaCardProps {
  categoriaId: number;
}

interface CategoriaCardProps {
  // existing properties...
  categoriaId?: number;
  onProductMove: (productId: string, sourceCategoryId: string, destinationCategoryId: string) => void;
}

interface Produto {
  // properties of the 'Produto' type or interface...
}
import { Button } from '@/components/ui/button';
import MenuCompleto from '@/components/menu-completo/menu-completo';
import { FaPlus } from "react-icons/fa6";


const CardapioPage: React.FC = () => {
    // Exemplo de dados para categorias e produtos
    const categorias = [
        {
            categoriaNome: "Pizza",
            produtos: [
                {
                    id: "1",
                    image: "/img/produtos/pizza calabresa.png",
                    description: "Pizza de Calabresa",
                    unitPrice: "36,00",
                    totalPrice: "36,00",
                    additions: []
                },
                {
                    id: "2",
                    image: "/img/produtos/pizza chocolate.jpg",
                    description: "Pizza de Chocolate",
                    unitPrice: "36,00",
                    totalPrice: "36,00",
                    additions: []
                }
            ]
        },
        
        {
            categoriaNome: "Hambúrgueres",
            produtos: [
                {
                    id: "1",
                    image: "/img/produtos/prod1.jpg",
                    description: "Black Dog Cheddar Bacon",
                    unitPrice: "22,00",
                    totalPrice: "22,00",
                    additions: []
                },
                {
                    id: "2",
                    image: "/img/produtos/prod4.jpg",
                    description: "Cheeseburger",
                    unitPrice: "15,00",
                    totalPrice: "15,00",
                    additions: []
                }
            ]
        },
        // Adicione mais categorias conforme necessário
    ];

    return (
        <div>
            <MenuCompleto />
            <div className="p-6">
                <div className="flex items-center justify-between my-4">
                    <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
                    <Button variant="outlineOrange" className="flex items-center gap-2">
                        <FaPlus className="h-5 w-5" />
                        Adicionar Categoria
                    </Button>
                </div>
                {categorias.map((categoria, index) => (
                    <CategoriaCard
                        key={index}
                        categoriaNome={categoria.categoriaNome}
                        produtos={categoria.produtos} onProductEdit={function (produto: Produto): void {
                            throw new Error('Function not implemented.');
                        } } onProductDelete={function (produto: Produto): void {
                            throw new Error('Function not implemented.');
                        } }
                    />
                 
                ))}
            </div>
        </div>
    );
};

export default CardapioPage;
