"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import Menu from "@/components/menu/page";


// Dados do gráfico
const chartData = [
    { mes: "Janeiro", pedidos: 186, novosclientes: 20, totalvendas: 1221.20 },
    { mes: "Fevereiro", pedidos: 305, novosclientes: 23, totalvendas: 1329.90 },
    { mes: "Março", pedidos: 237, novosclientes: 24, totalvendas: 1271.50 },
    { mes: "Abril", pedidos: 73, novosclientes: 26, totalvendas: 1429.15 },
    { mes: "Maio", pedidos: 209, novosclientes: 41, totalvendas: 2213.10 },
    { mes: "Jun", pedidos: 214, novosclientes: 15, totalvendas: 785.35 },
    { mes: "Jul", pedidos: 171, novosclientes: 13, totalvendas: 675.35 },
];

// Configurações do gráfico
const chartConfig = {
    pedidos: {
        label: "Total Pedidos",
        color: "#FF5722",
    },
    novosclientes: {
        label: "Novos Clientes",
        color: "#C62828",
    },
    totalvendas: {
        label: "Total Vendas",
        color: "#FFC107",
    },
} satisfies ChartConfig;

const PaymentsPage = dynamic(() => import("../payments/page"), { ssr: false });

const DashboardPage = () => {
    // Estado para controlar a aba ativa
    const [activeTab, setActiveTab] = React.useState<keyof typeof chartConfig>("pedidos");

    // Estado para verificar se estamos no client-side
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Menu/>
            <div className="flex flex-1">
                {/* Lado esquerdo */}
                <div className="w-1/3 bg-white px-8 border-r ">
                    <h1 className="text-3xl font-semibold text-left mt-4">Dashboard</h1>
                    <div className="flex flex-col gap-2 mt-4">
                        {Object.keys(chartConfig).map((key) => (
                            <button
                                key={key}
                                className={`py-2 px-4 text-sm font-medium ${activeTab === key ? "bg-orange-500 text-white" : " bg-white border border-orange-500"} rounded`}
                                onClick={() => setActiveTab(key as keyof typeof chartConfig)}
                            >
                                {chartConfig[key as keyof typeof chartConfig].label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        {isClient && (
                            <ChartContainer config={chartConfig} className="h-72 w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="mes"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey={activeTab} fill={chartConfig[activeTab].color} radius={3} />
                                </BarChart>
                            </ChartContainer>
                        )}
                    </div>
                </div>
                {/* Lado direito */}
                <div className="w-2/3">
                    <h1 className="text-3xl font-semibold text-left mt-4 pl-8">Últimos Pedidos</h1>
                    <PaymentsPage />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
