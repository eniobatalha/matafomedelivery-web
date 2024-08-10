import React from 'react';

// Definindo as cores e textos para as variações de status do pedido
const statusMap: { [key: number]: { text: string, color: string } } = {
    1: { text: 'Novo', color: 'bg-gray-500' },
    2: { text: 'Em Preparo', color: 'bg-yellow-500' },
    3: { text: 'Saiu Para Entrega', color: 'bg-blue-500' },
    4: { text: 'Entregue', color: 'bg-green-500' },
    5: { text: 'Cancelado', color: 'bg-red-500' },
};

const timeColor = 'bg-orange-500';

interface TagProps {
    type: 'status' | 'time';
    value: string | number;
}

const Tag: React.FC<TagProps> = ({ type, value }) => {
    const baseStyle = 'inline-block p-1 px-2 rounded-xl text-white text-xs font-bold';

    let tagColor = '';
    let tagText = '';

    if (type === 'status' && typeof value === 'number') {
        const status = statusMap[value];
        if (status) {
            tagColor = status.color;
            tagText = status.text;
        } else {
            tagColor = 'bg-gray-500'; // Cor padrão se o valor do status não for encontrado
            tagText = 'Desconhecido';
        }
    } else if (type === 'time' && typeof value === 'string') {
        tagColor = timeColor;
        tagText = value;
    }

    return (
        <span className={`${baseStyle} ${tagColor}`}>
            {tagText}
        </span>
    );
};

export default Tag;