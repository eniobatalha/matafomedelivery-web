'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface CategoriaData {
  nomeCategoria: string;
  quantidadeVendida: number;
}

const BarrasCategorias = ({ data }: { data: CategoriaData[] }) => {
  const formatData = data.map(item => ({
    category: item.nomeCategoria || 'Categoria sem Nome',
    value: item.quantidadeVendida,
  }));

  return (
    <BarChart
      xAxis={[
        {
          scaleType: 'band',
          data: formatData.map(item => item.category),
        }
      ]}
      series={[
        {
          data: formatData.map(item => item.value),
          color: '#FF7300',
        }
      ]}
      margin={{ top: 25, right: 15, bottom: 25, left: 15 }}

      width={500}
      height={473}
    />
  );
};

export default BarrasCategorias;
