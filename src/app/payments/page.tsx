import { MainNav } from "@/components/main-nav/main-nav"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { UserNav } from "@/components/user-nav/user-nav"

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
        <div className="border-b">
            <div className="flex h-16 items-center px-4 bg-orange-500">
                <img
                    src="/img/LogoNome.png"
                    alt="Logo Nome Mata Fome Delivery"
                    className="w-32 h-auto ml-4 mr-8"
                />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-8">
                    <UserNav />
                </div>
            </div>
            <div className="p-8">
                <h2 className="text-3xl font-bold tracking-tight">Histórico de Pedidos</h2>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
