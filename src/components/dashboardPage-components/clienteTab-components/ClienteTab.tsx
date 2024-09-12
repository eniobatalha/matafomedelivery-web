import React, { useEffect, useState } from 'react';
import DashboardGenericCard from "../generic-card/dashboard-generic-card";
import BarrasBairros from "./BarrasBairros";
import { TableTopClientes } from "./TableTopClientes";
import { DatePickerHistorico } from '@/components/datepicker-historico/datepicker-historico';
import { DateRange } from "react-day-picker";
import { subDays } from 'date-fns';
import axios from '@/app/axiosConfig';
import { useToast } from '@/components/ui/use-toast'; // Importando o hook de toast

// Função para formatar a data no formato YYYY-MM-DD
const formatDateForApi = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const ClienteTab = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  const [clientData, setClientData] = useState({
    novosClientes: 0,
    clientesAtivos: 0,
    taxaRentecao: 0,
    cepsAtendidos: 0,
    clientesMaisFrequentes: [],
    bairrosMaisFrequentes: [],
  });

  const { toast } = useToast(); // Hook do toast

  const fetchClientData = async (range?: DateRange) => {
    const empresaId = JSON.parse(localStorage.getItem('empresaData') || '{}').id;
    const startDateFormatted = formatDateForApi(range?.from || subDays(new Date(), 6));
    const endDateFormatted = formatDateForApi(range?.to || new Date());

    try {
      const response = await axios.get(`/pedidos/historicoClientes`, {
        params: {
          empresaId,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
        },
      });
      setClientData(response.data);
    } catch (error: any) {
      toast({
        title: 'Erro ao buscar dados de cliente',
        description: error.message || 'Ocorreu um erro ao carregar os dados.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchClientData(); // Busca os dados ao carregar a página
  }, []);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    fetchClientData(range); // Busca os dados ao selecionar o período
  };

  return (
    <>
      <div className="flex justify-end items-center space-x-2 -mt-14 mb-8">
        <DatePickerHistorico onDateSelect={handleDateSelect} initialRange={dateRange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardGenericCard
          title="Novos Clientes"
          value={`+${clientData.novosClientes}`}
          subtitle={`${clientData.novosClientes} novos clientes no período informado`}
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
          title="Total de Clientes Ativos"
          value={`${clientData.clientesAtivos}`}
          subtitle={`${clientData.clientesAtivos} fregueses pediram mais de uma vez no período informado`}
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
          title="Taxa de Retenção de Clientes"
          value={`${clientData.taxaRentecao.toFixed(1).replace('.', ',')}%`}
          subtitle={`${clientData.taxaRentecao.toFixed(2).replace('.', ',')}% dos clientes ativos pediram mais de uma vez`}
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
          title="Bairros Atendidos"
          value={`${clientData.cepsAtendidos}`}
          subtitle={`Seu negócio atende ${clientData.cepsAtendidos} bairros diferentes`}
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
              <path d="M12 2C8.54 2 5.5 5.54 5.5 9c0 1.58.7 3.13 1.84 4.23L12 22l4.66-8.77c1.14-1.1 1.84-2.65 1.84-4.23 0-3.46-3.04-7-6.5-7z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
          }
        />
      </div>

      {/* Inclusão dos gráficos e tabela */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="col-span-4 p-4 shadow-md">
          <div className="bg-white rounded-lg">
            <h3 className="text-lg font-bold">Clientes Mais Frequentes</h3>
            <TableTopClientes data={clientData.clientesMaisFrequentes} />
          </div>
        </div>
        <div className="col-span-3 p-4 shadow-md">
          <div className="bg-white rounded-lg">
            <h3 className="text-lg font-bold">Bairros Mais Frequentes</h3>
            <BarrasBairros data={clientData.bairrosMaisFrequentes} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClienteTab;
