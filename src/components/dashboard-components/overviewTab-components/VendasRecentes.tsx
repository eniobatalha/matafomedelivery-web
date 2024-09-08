import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
        .reverse() // Inverte a ordem dos dados
        .slice(0, 5) // Limita a exibição para os primeiros 5 itens
        .map((venda: { nomeCliente: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; numeroTelefone: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; valorDoPedido: number; }, index: Key | null | undefined) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>{venda.nomeCliente ? String(venda.nomeCliente)[0] : null}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{venda.nomeCliente}</p>
            <p className="text-sm text-muted-foreground">{venda.numeroTelefone}</p>
          </div>
          <div className="ml-auto font-medium">{formatCurrency(venda.valorDoPedido)}</div>
        </div>
      ))}
    </div>
  );
};
