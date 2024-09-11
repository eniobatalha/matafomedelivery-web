import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableTopClientes({ data }: { data: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Bairro</TableHead>
          <TableHead>Total Pedidos</TableHead>
          <TableHead className="text-right">Total Pago</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cliente, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}º</TableCell>
            <TableCell className="font-medium">{cliente.nome}</TableCell>
            <TableCell>{cliente.bairro}</TableCell>
            <TableCell>{cliente.totalPedidos}</TableCell>
            <TableCell className="text-right">R${cliente.totalPago.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            R${data.reduce((acc, cliente) => acc + cliente.totalPago, 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
