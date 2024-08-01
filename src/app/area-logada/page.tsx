"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaHome } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { MdMenuBook, MdHistory } from "react-icons/md";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
            <div className="w-full bg-orange-500">
                <NavigationMenu className="h-14">
                    <NavigationMenuList className="flex justify-around w-full">
                        <img
                            src="/img/LogoNome.png"
                            alt="Logo Nome Mata Fome Delivery"
                            className="w-32 h-auto ml-8 mr-8"
                        />
                        <NavigationMenuItem>
                            <Link href="/area-logada" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <FaHome className="mr-2" />
                                    Início
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/docs" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <GiKnifeFork className="mr-2" />
                                    Acompanhar Pedidos
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/docs" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <MdMenuBook className="mr-2" />
                                    Cardápio
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/payments" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <MdHistory className="mr-2" />
                                    Histórico de Pedidos
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex flex-1">
                {/* Lado esquerdo */}
                <div className="w-1/3 bg-white px-8 border-r ">
                    <h1 className="text-3xl font-semibold text-left mt-8 mb-4">Dashboard</h1>
                    <div className="flex flex-col gap-2 pt-10">
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
                            <ChartContainer config={chartConfig} className="h-96 w-full">
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
                    <h1 className="text-3xl font-semibold text-left mt-4 pt-4 pl-8">Últimos Pedidos</h1>
                    <PaymentsPage />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
