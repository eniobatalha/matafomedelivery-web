"use client";

import React, { useState, useEffect } from "react";
import MenuCompleto from "@/components/menu-completo/menu-completo";
import { Footer } from "@/components/footer/footer";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import axiosInstance from '@/app/axiosConfig';
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerHistorico } from "@/components/datepicker-historico/datepicker-historico";
import { Button } from "@/components/ui/button";

interface Pedido {
    id: number;
    cliente: { nome: string };
    status: string;
    enderecoEntrega: { bairro: string };
    statusPagamento: string;
    valorTotal: number;
    dataHoraPedido: string;
}

const HistoricoPedidosPage: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        id: "",
        dateRange: undefined as DateRange | undefined,
        cliente: "",
        bairro: "",
        valorMin: "",
        valorMax: "",
    });

    const handleClearFilters = () => {
        setFilters({
            id: "",
            dateRange: undefined,
            cliente: "",
            bairro: "",
            valorMin: "",
            valorMax: "",
        });
    };
    

    useEffect(() => {
        async function fetchPedidos() {
            try {
                const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
                const empresaId = empresaData?.id;

                if (!empresaId) {
                    console.error("Empresa ID não encontrado no localStorage");
                    setLoading(false);
                    return;
                }

                const response = await axiosInstance.get(`/empresas/${empresaId}/pedidos`);
                setPedidos(response.data);
            } catch (error) {
                console.error("Erro ao buscar os pedidos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPedidos();
    }, []);

    const handleDateSelect = (range: DateRange | undefined) => {
        setFilters({ ...filters, dateRange: range });
    };

    const filteredPedidos = pedidos.filter((pedido) => {
        const pedidoDate = new Date(pedido.dataHoraPedido);

        const matchesId = filters.id ? pedido.id.toString().startsWith(filters.id) : true;

        const matchesDateRange = filters.dateRange
            ? isWithinInterval(pedidoDate, {
                start: filters.dateRange.from ? startOfDay(filters.dateRange.from) : new Date(0),
                end: filters.dateRange.to ? endOfDay(filters.dateRange.to) : new Date(),
            })
            : true;

        const matchesCliente = pedido.cliente.nome.toLowerCase().includes(filters.cliente.toLowerCase());
        const matchesBairro = pedido.enderecoEntrega.bairro.toLowerCase().includes(filters.bairro.toLowerCase());

        const matchesValorTotal = filters.valorMin || filters.valorMax
            ? pedido.valorTotal >= (parseFloat(filters.valorMin) || 0) &&
              pedido.valorTotal <= (parseFloat(filters.valorMax) || Infinity)
            : true;

        return matchesId && matchesDateRange && matchesCliente && matchesBairro && matchesValorTotal;
    });

    return (
        <div className="flex flex-col min-h-screen">
            <MenuCompleto />
            <div className="flex-1 p-8">
                <div className="flex justify-between mb-4">
                    <h2 className="text-3xl font-bold tracking-tight">Histórico de Pedidos</h2>
                    <Button variant="outlineOrange" onClick={handleClearFilters}>Limpar Filtros</Button>
                </div>
                <div className="mb-4 flex gap-4">
                    <Input
                        type="text"
                        placeholder="Filtrar por ID"
                        value={filters.id}
                        onChange={(e) => setFilters({ ...filters, id: e.target.value })}
                        className="w-1/6"
                    />
                    <DatePickerHistorico onDateSelect={handleDateSelect} />
                    <Input
                        type="text"
                        placeholder="Filtrar por cliente"
                        value={filters.cliente}
                        onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
                        className="w-1/4"
                    />
                    <Input
                        type="text"
                        placeholder="Filtrar por bairro"
                        value={filters.bairro}
                        onChange={(e) => setFilters({ ...filters, bairro: e.target.value })}
                        className="w-1/4"
                    />
                    <div className="flex gap-2 w-1/4">
                        <Input
                            type="text"
                            placeholder="Valor Mínimo"
                            value={filters.valorMin}
                            onChange={(e) => setFilters({ ...filters, valorMin: e.target.value })}
                            className="w-1/2"
                        />
                        <Input
                            type="text"
                            placeholder="Valor Máximo"
                            value={filters.valorMax}
                            onChange={(e) => setFilters({ ...filters, valorMax: e.target.value })}
                            className="w-1/2"
                        />
                    </div>
                </div>
                {loading ? (
                    <p>Carregando histórico de pedidos...</p>
                ) : (
                    <DataTable columns={columns} data={filteredPedidos} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HistoricoPedidosPage;
