"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/tag-pedido/tag-pedido";
import ActionCell from "./action-cell";


// Função para mapear o status da API para o formato usado no frontend
function mapStatus(status: string): number {
    switch (status) {
        case "PENDENTE":
            return 1;
        case "PROCESSANDO":
            return 2;
        case "EM_TRANSITO":
            return 3;
        case "ENTREGUE":
            return 4;
        case "CANCELADO":
            return 5;
        default:
            return 0; // Desconhecido
    }
}

// Função para formatar a data, se necessário
function formatDateTime(dateTimeString: string): string {
    const isFormatted = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/.test(dateTimeString);

    if (isFormatted) {
        return dateTimeString;
    }

    try {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
        console.error("Erro ao formatar a data:", error);
        return dateTimeString;
    }
}

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "dataHoraPedido",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Data do Pedido
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ cell }) => formatDateTime(cell.getValue() as string),
    },
    {
        accessorKey: "cliente.nome",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Cliente
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status do Pedido
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <Tag type="status" value={mapStatus(info.getValue() as string)} />,
    },
    {
        accessorKey: "enderecoEntrega.bairro",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Bairro
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "statusPagamento",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status Pagamento
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <Tag type="statusPagamento" value={info.getValue() as string | number} />,
    },
    {
        accessorKey: "valorTotal",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total (R$)
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => `R$ ${(info.getValue() as number).toFixed(2)}`,
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => <ActionCell pedido={row.original} />,
    },
];
