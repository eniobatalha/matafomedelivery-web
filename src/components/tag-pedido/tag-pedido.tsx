import React from 'react';
import { Badge } from '@/components/ui/badge';

const statusMap: { [key: number]: { text: string, variant: string } } = {
    1: { text: 'Novo', variant: 'novo' },
    2: { text: 'Em Preparo', variant: 'emPreparo' },
    3: { text: 'Saiu Para Entrega', variant: 'saiuParaEntrega' },
    4: { text: 'Entregue', variant: 'entregue' },
    5: { text: 'Cancelado', variant: 'cancelado' },
};

interface TagProps {
    type: 'status' | 'time';
    value: string | number;
}

const Tag: React.FC<TagProps> = ({ type, value }) => {
    let variant = '';
    let tagText = '';

    if (type === 'status' && typeof value === 'number') {
        const status = statusMap[value];
        if (status) {
            variant = status.variant;
            tagText = status.text;
        } else {
            variant = 'novo'; // Variantes padrão para status desconhecido
            tagText = 'Desconhecido';
        }
    } else if (type === 'time' && typeof value === 'string') {
        variant = 'time';
        tagText = value;
    }

    return (
        <Badge variant={variant as "time" | "default" | "destructive" | "outline" | "secondary" | "novo" | "emPreparo" | "saiuParaEntrega" | "entregue" | "cancelado" | null | undefined}>
            {tagText}
        </Badge>
    );
};

export default Tag;
