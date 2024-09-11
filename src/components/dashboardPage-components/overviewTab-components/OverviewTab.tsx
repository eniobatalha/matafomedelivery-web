import { useState, useEffect } from 'react';
import axios from '@/app/axiosConfig';
import DashboardGenericCard from "../generic-card/dashboard-generic-card";
import { BarrasPeriodo } from "./BarrasPeriodo";
import { VendasRecentes } from "./VendasRecentes";
import { DatePickerHistorico } from '@/components/datepicker-historico/datepicker-historico';
import { DateRange } from "react-day-picker";
import { subDays } from 'date-fns';
import { Button } from '@/components/ui/button';

// Função para formatar a data no formato YYYY-MM-DD
const formatDateForApi = (date: Date) => {
  return date.toISOString().split('T')[0]; // Extrai apenas a parte YYYY-MM-DD
};

const OverviewTab = () => {
  const [empresaId, setEmpresaId] = useState<string | null>(null);

  // Define a data inicial como 6 dias atrás e a final como hoje
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  const [overviewData, setOverviewData] = useState({
    totalVendas: 0,
    quantidadeClientes: 0,
    quantidadePedidos: 0,
    pedidosHoje: 0,
    pedidosUltimos7Dias: [],
    ultimasVendas: []
  });

  // Obter o empresaId do localStorage no lado do cliente
  useEffect(() => {
    const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
    setEmpresaId(empresaData.id || null);
  }, []);

  // Função para buscar os dados da API
  const fetchOverviewData = async (range?: DateRange) => {
    if (!empresaId) {
      console.error("Empresa ID não encontrado");
      return;
    }

    const startDateFormatted = formatDateForApi(range?.from || subDays(new Date(), 6));
    const endDateFormatted = formatDateForApi(range?.to || new Date());

    try {
      const response = await axios.get(`/pedidos/historicoPedidos`, {
        params: {
          empresaId,
          startDate: startDateFormatted,
          endDate: endDateFormatted
        }
      });

      setOverviewData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados de overview:', error);
    }
  };

  // Efeito para buscar os dados da API quando a página é carregada (últimos 7 dias)
  useEffect(() => {
    if (empresaId) {
      fetchOverviewData(); // Carrega com os últimos 7 dias no início
    }
  }, [empresaId]);

  // Função que será chamada ao clicar no botão "Aplicar"
  const handleApplyClick = () => {
    fetchOverviewData(dateRange); // Carrega com as datas selecionadas ao clicar em "Aplicar"
  };

  // Renderização do DatePickerHistorico e atualização das datas
  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    fetchOverviewData(range); // Busca os dados automaticamente quando o range de datas for alterado
  };


  return (
    <>
      {/* Seletor de datas e botão de aplicar */}
      <div className="flex justify-end items-center space-x-2 -mt-14 mb-8">
        <DatePickerHistorico onDateSelect={handleDateSelect} initialRange={dateRange} />
        {/* <Button variant="orange" onClick={handleApplyClick}>Aplicar</Button> */}
      </div>

      {/* Cards do Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardGenericCard
          title="Total Vendas Período"
          value={`R$${overviewData.totalVendas !== null ? overviewData.totalVendas.toFixed(2).replace('.', ',') : '0,00'}`}
          subtitle="Total de vendas no período selecionado"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Clientes"
          value={`+${overviewData.quantidadeClientes !== null ? overviewData.quantidadeClientes : 0}`}
          subtitle="Total de clientes no período selecionado"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Pedidos"
          value={`+${overviewData.quantidadePedidos !== null ? overviewData.quantidadePedidos : 0}`}
          subtitle="Total de pedidos no período selecionado"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Pedidos Hoje"
          value={`+${overviewData.pedidosHoje}`}
          subtitle="Total de pedidos realizados hoje"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        />
      </div>

      {/* Gráfico de vendas por período */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="col-span-4 shadow-xl p-4">
          <h3 className="text-lg font-bold">Visão Geral de Vendas</h3>
          <BarrasPeriodo
            data={overviewData.pedidosUltimos7Dias}
            startDate={dateRange?.from || new Date()}
            endDate={dateRange?.to || new Date()}
          />
        </div>

        {/* Vendas Recentes */}
        <div className="col-span-3 shadow-xl p-4">
          <h3 className="text-lg font-bold mb-2">Vendas Recentes</h3>
          <VendasRecentes data={overviewData.ultimasVendas} />
        </div>
      </div>
    </>
  );
};

export default OverviewTab;
