import React from "react"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import MenuCompleto from "@/components/menu-completo/menu-completo"
import { Footer } from "@/components/footer/footer"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            pedido: 1,
            cliente: "Enio Batalha",
            status: "Pendente",
            bairro: "Bulhões",
            total: 45.50
        },
        {
            pedido: 2,
            cliente: "Clauscyberion",
            status: "Em produção",
            bairro: "Sucupira",
            total: 78.20
        },
        {
            pedido: 3,
            cliente: "Jonathas Gabriel",
            status: "Enviado",
            bairro: "Ibura",
            total: 62.75
        },
        {
            pedido: 4,
            cliente: "Giovani",
            status: "Cancelado",
            bairro: "Cajueiro Seco",
            total: 54.90
        },
        {
            pedido: 5,
            cliente: "Carlos",
            status: "Pendente",
            bairro: "Socorro",
            total: 81.60
        },
        {
            pedido: 6,
            cliente: "Matheus",
            status: "Em produção",
            bairro: "Curado",
            total: 33.40
        },
        {
            pedido: 7,
            cliente: "João Vitor",
            status: "Enviado",
            bairro: "Lote 56",
            total: 89.15
        },
        {
            pedido: 8,
            cliente: "Ernani",
            status: "Cancelado",
            bairro: "Vila Rica",
            total: 72.80
        },
        {
            pedido: 9,
            cliente: "Enio Batalha",
            status: "Em produção",
            bairro: "Sucupira",
            total: 66.50
        },
        {
            pedido: 10,
            cliente: "Clauscyberion",
            status: "Pendente",
            bairro: "Ibura",
            total: 39.90
        },
        {
            pedido: 11,
            cliente: "Jonathas Gabriel",
            status: "Enviado",
            bairro: "Cajueiro Seco",
            total: 53.25
        },
        {
            pedido: 12,
            cliente: "Giovani",
            status: "Cancelado",
            bairro: "Socorro",
            total: 88.10
        },
        {
            pedido: 13,
            cliente: "Carlos",
            status: "Em produção",
            bairro: "Curado",
            total: 72.55
        },
        {
            pedido: 14,
            cliente: "Matheus",
            status: "Enviado",
            bairro: "Lote 56",
            total: 48.90
        },
        {
            pedido: 15,
            cliente: "João Vitor",
            status: "Cancelado",
            bairro: "Vila Rica",
            total: 57.30
        },
        {
            pedido: 16,
            cliente: "Ernani",
            status: "Pendente",
            bairro: "Bulhões",
            total: 83.45
        },
        {
            pedido: 17,
            cliente: "Enio Batalha",
            status: "Em produção",
            bairro: "Cajueiro Seco",
            total: 90.00
        },
        {
            pedido: 18,
            cliente: "Clauscyberion",
            status: "Enviado",
            bairro: "Socorro",
            total: 38.75
        },
        {
            pedido: 19,
            cliente: "Jonathas Gabriel",
            status: "Cancelado",
            bairro: "Curado",
            total: 71.40
        },
        {
            pedido: 20,
            cliente: "Giovani",
            status: "Pendente",
            bairro: "Lote 56",
            total: 67.20
        }
    ]

}

export default async function PaymentsPage() {
    const data = await getData()

    return (
        <div className="flex flex-col min-h-screen">
            <div className="border-b flex-grow">
                <MenuCompleto />
                <div className="p-8">
                    <h2 className="text-3xl font-bold tracking-tight">Histórico de Pedidos</h2>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
            <Footer />
        </div>
    )

}