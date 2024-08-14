import React from 'react';

interface ProductProps {
    image: string;
    description: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    additions: string[];
}

const CardConteudoProduto: React.FC<ProductProps> = ({
    image,
    description,
    quantity,
    unitPrice,
    totalPrice,
    additions,
}) => (
    <div className="flex gap-4 mb-4">
        <img src={image} alt={description} className="w-12 h-12 rounded" />
        <div className="flex-grow">
            <div className="flex justify-between items-center">
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

<<<<<<< HEAD
export default CardConteudoProduto;
=======
export default CardConteudoProduto;
>>>>>>> main
