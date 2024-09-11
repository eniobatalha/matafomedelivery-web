import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/formatters";
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, ReactPortal, Key } from "react";

export const VendasRecentes = ({ data }: { data: any[] }) => {
  // Função para formatar valor monetário
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-8 p-4">
      {data
        .slice() // Faz uma cópia do array
        .slice(0, 7) // Limita a exibição para os primeiros 5 itens
        .map((venda: {
          dataHoraPedido: string; nomeCliente: string; numeroTelefone: string; valorDoPedido: number; 
}, index: Key | null | undefined) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>{venda.nomeCliente ? String(venda.nomeCliente)[0] : null}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{venda.nomeCliente}</p>
            <p className="text-sm text-muted-foreground">{venda.numeroTelefone}</p>
          </div>
          <div className="ml-auto text-sm font-medium">{formatDateTime(venda.dataHoraPedido)}</div>
          <div className="ml-auto font-bold">{formatCurrency(venda.valorDoPedido)}</div>
        </div>
      ))}
    </div>
  );
};
