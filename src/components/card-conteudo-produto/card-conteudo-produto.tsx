import React from 'react';

interface CardConteudoProdutoProps {
    id: number;
    name: string;
    image: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    additions: { id: number; nome: string; valor: number }[];
}

const CardConteudoProduto: React.FC<CardConteudoProdutoProps> = ({
    id,
    name,
    image,
    description,
    quantity,
    unitPrice,
    totalPrice,
    additions,
}) => {
    return (
        <div className="flex">
            <img src={image} alt={name} className="w-20 h-20 object-cover" />
            <div className="ml-4">
                <h4 className="text-lg font-bold">{name}</h4>
                <p className="text-sm text-gray-500">{description}</p>
                <div className="text-sm text-gray-500">{`${quantity} x R$ ${unitPrice.toFixed(2)}`}</div>
                <div className="text-sm text-gray-500">
                    {Array.isArray(additions) && additions.length > 0 ? (
                        additions.map((addition) => (
                            <div key={addition.id}>- {addition.nome} (R$ {addition.valor.toFixed(2)})</div>
                        ))
                    ) : (
                        <p>Sem adicionais</p>
                    )}
                </div>
                <div className="text-lg font-bold text-orange-500 mt-2">Total: R$ {totalPrice.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default CardConteudoProduto;
