import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const clientes = [
    {
        idcliente: "1",
        nomeCliente: "Enio Batalha",
        bairro: "Cavaleiro",
        totalPedido: 3,
        totalPago: "R$250,00",
    },
    {
        idcliente: "2",
        nomeCliente: "Giovani Feitosa",
        bairro: "Piedade",
        totalPedido: 2,
        totalPago: "R$150,00",
    },
    {
        idcliente: "3",
        nomeCliente: "Jonathas Gabriel",
        bairro: "Jardim Piedade",
        totalPedido: 4,
        totalPago: "R$350,00",
    },
    {
        idcliente: "4",
        nomeCliente: "Clauscyberion",
        bairro: "Prazeres",
        totalPedido: 5,
        totalPago: "R$450,00",
    },
    {
        idcliente: "5",
        nomeCliente: "Ernani",
        bairro: "Cavaleiro",
        totalPedido: 6,
        totalPago: "R$550,00",
    },
];


export function TableClientes() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead>Bairro</TableHead>
                    <TableHead>Total Pedidos</TableHead>
                    <TableHead className="text-right">Total Pago</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clientes.map((cliente) => (
                    <TableRow key={cliente.idcliente}>
                        <TableCell className="font-medium">{cliente.idcliente}</TableCell>
                        <TableCell className="font-medium">{cliente.nomeCliente}</TableCell>
                        <TableCell>{cliente.bairro}</TableCell>
                        <TableCell>{cliente.totalPedido}</TableCell>
                        <TableCell className="text-right">{cliente.totalPago}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">R$1.750,00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
