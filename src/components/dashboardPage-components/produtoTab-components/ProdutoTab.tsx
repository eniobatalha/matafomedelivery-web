import { useState, useEffect } from "react";
import axios from "@/app/axiosConfig";
import DashboardGenericCard from "../generic-card/dashboard-generic-card";
import BarrasCategorias from "./BarrasCategorias";
import PizzaProdutos from "./PizzaProdutos";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { DatePickerHistorico } from "@/components/datepicker-historico/datepicker-historico";

// Tipos dos dados retornados pela API
interface ProdutoVendido {
  nomeProduto: string;
  quantidadeVendida: number;
}

interface ProdutoLucrativo {
  nomeProduto: string;
  valorTotal: number;
}

interface PrateleiraVendida {
  nomeCategoria: string;
  quantidadeVendida: number;
}

interface PrateleiraLucrativa {
  nomeCategoria: string;
  valorTotal: number;
}

interface ProdutoData {
  produtosMaisVendidos: ProdutoVendido[];
  produtosMaisLucrativos: ProdutoLucrativo[];
  prateleirasMaisVendidas: PrateleiraVendida[];
  prateleirasMaisLucrativas: PrateleiraLucrativa[];
}

// Função para formatar a data no formato YYYY-MM-DD
const formatDateForApi = (date: Date) => {
  return date.toISOString().split('T')[0]; // Extrai apenas a parte YYYY-MM-DD
};

const ProdutoTab = () => {
  const [empresaId, setEmpresaId] = useState<string | null>(null);

  // Define a data inicial como 6 dias atrás e a final como hoje
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  const [produtoData, setProdutoData] = useState<ProdutoData>({
    produtosMaisVendidos: [],
    produtosMaisLucrativos: [],
    prateleirasMaisVendidas: [],
    prateleirasMaisLucrativas: []
  });

  // Obter o empresaId do localStorage no lado do cliente
  useEffect(() => {
    const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
    setEmpresaId(empresaData.id || null);
  }, []);

  // Função para buscar os dados da API
  const fetchProdutoData = async (range?: DateRange) => {
    if (!empresaId) {
      console.error("Empresa ID não encontrado");
      return;
    }

    const startDateFormatted = formatDateForApi(range?.from || subDays(new Date(), 6));
    const endDateFormatted = formatDateForApi(range?.to || new Date());

    try {
      const response = await axios.get(`/pedidos/historicoProdutos`, {
        params: {
          empresaId,
          startDate: startDateFormatted,
          endDate: endDateFormatted
        }
      });

      setProdutoData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de produto:", error);
    }
  };

  // Efeito para buscar os dados da API quando a página é carregada (últimos 7 dias)
  useEffect(() => {
    if (empresaId) {
      fetchProdutoData();
    }
  }, [empresaId]);

  // Função que será chamada ao selecionar datas no DatePicker
  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    fetchProdutoData(range);
  };

  return (
    <>
      <div className="flex justify-end items-center space-x-2 mb-4">
        <DatePickerHistorico onDateSelect={handleDateSelect} initialRange={dateRange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardGenericCard
          title="Produto Mais Vendido"
          value={produtoData.produtosMaisVendidos.length > 0 ? produtoData.produtosMaisVendidos[0].nomeProduto : "N/A"}
          subtitle={`${produtoData.produtosMaisVendidos.length > 0 ? produtoData.produtosMaisVendidos[0].quantidadeVendida : 0} vezes pedido no período selecionado`}
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
              <path d="M3 18l9-6 9 6V6l-9-6-9 6v12z" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Produto Mais Lucrativo"
          value={produtoData.produtosMaisLucrativos.length > 0 ? produtoData.produtosMaisLucrativos[0].nomeProduto : "N/A"}
          subtitle={`R$${produtoData.produtosMaisLucrativos.length > 0 ? produtoData.produtosMaisLucrativos[0].valorTotal.toFixed(2).replace('.', ',') : "0,00"} de lucro no período selecionado`}
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
          title="Categoria Mais Vendida"
          value={produtoData.prateleirasMaisVendidas.length > 0 ? produtoData.prateleirasMaisVendidas[0].nomeCategoria : "N/A"}
          subtitle={`${produtoData.prateleirasMaisVendidas.length > 0 ? produtoData.prateleirasMaisVendidas[0].quantidadeVendida : 0} vezes pedida no período selecionado`}
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
              <path d="M3 18l9-6 9 6V6l-9-6-9 6v12z" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Categoria Mais Lucrativa"
          value={produtoData.prateleirasMaisLucrativas.length > 0 ? produtoData.prateleirasMaisLucrativas[0].nomeCategoria : "N/A"}
          subtitle={`R$${produtoData.prateleirasMaisLucrativas.length > 0 ? produtoData.prateleirasMaisLucrativas[0].valorTotal.toFixed(2).replace('.', ',') : "0,00"} de lucro no período selecionado`}
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
      </div>

      {/* Inclusão dos gráficos de pizza e barras */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="col-span-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-3">Produtos Mais Vendidos</h3>
            <PizzaProdutos data={produtoData.produtosMaisVendidos} />
          </div>
        </div>
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold">Categorias Mais Vendidas</h3>
            <BarrasCategorias data={produtoData.prateleirasMaisVendidas} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdutoTab;
