import React from 'react';

interface ProductProps {
    id: string;
    name: string;
    unitPrice: string;
    description: string;
    image: string;
    quantity: number; 
    totalPrice: string;
    additions: string[];
}

const CardConteudoProduto: React.FC<ProductProps> = ({
    id,
    name,
    unitPrice,
    description,
    image,
    quantity,
    totalPrice,
    additions,
}) => (
    <div className="flex gap-4 mb-4">
        <img src={image} alt={description} className="w-12 h-12 rounded" />
        <div className="flex-grow">
            <div id={id} className="flex justify-between items-center">
                <div className="text-base font-semibold">{name}</div>
                <div className="text-base font-semibold">{description}</div>
                <div className="text-base font-semibold">{totalPrice}</div>
            </div>
            <div className="text-sm text-gray-500">{`${quantity} x R$ ${unitPrice}`}</div>
            <div className="text-sm text-gray-500">
                {additions.map((addition, index) => (
                    <div key={index}>- {addition}</div>
                ))}
            </div>
        </div>
    </div>
);

export default CardConteudoProduto;
