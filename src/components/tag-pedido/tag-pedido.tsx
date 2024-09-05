import React from 'react';
import { Badge } from '@/components/ui/badge';

const statusMap: { [key: number]: { text: string, variant: string } } = {
    1: { text: '🆕 Novo', variant: 'novo' },
    2: { text: '👨🏾‍🍳 Em Preparo', variant: 'emPreparo' },
    3: { text: '🛩️ Saiu Para Entrega', variant: 'saiuParaEntrega' },
    4: { text: '✅ Entregue', variant: 'entregue' },
    5: { text: '😢 Cancelado', variant: 'cancelado' },
};

const statusPagamentoMap: { [key: string]: { text: string, variant: string } } = {
    // 'pago': { text: '🤑 Pago', variant: 'pago' },
    'aprovado': { text: '🤑 Pago', variant: 'pago' }, // Mapeando "aprovado" para "pago"
    'pendente': { text: '👀 Pendente', variant: 'pendente' },
    'cancelado': { text: '🤬 Cancelado', variant: 'cancelado' },
    'em_analise': { text: '🔍 Em Análise', variant: 'emAnalise' },
    'recusado': { text: '❌ Recusado', variant: 'recusado' },
    'reembolsado': { text: '💸 Reembolsado', variant: 'reembolsado' },
    'falha': { text: '⚠️ Falha', variant: 'falha' },
};


interface TagProps {
    type: 'status' | 'time' | 'statusPagamento';
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
            variant = 'novo'; // Variante padrão para status desconhecido
            tagText = 'Desconhecido';
        }
    } else if (type === 'time' && typeof value === 'string') {
        variant = 'time';
        tagText = value;
    } else if (type === 'statusPagamento' && typeof value === 'string') {
        const statusPagamento = statusPagamentoMap[value.toLowerCase()];
        if (statusPagamento) {
            variant = statusPagamento.variant;
            tagText = statusPagamento.text;
        } else {
            variant = 'pendente'; // Variante padrão para status de pagamento desconhecido
            tagText = 'Desconhecido';
        }
    }

    return (
        <Badge variant={variant as "time" | "default" | "destructive" | "outline" | "secondary" | "novo" | "emPreparo" | "saiuParaEntrega" | "entregue" | "cancelado" | "pago" | "pendente" | null | undefined}>
            {tagText}
        </Badge>
    );
};

export default Tag;
