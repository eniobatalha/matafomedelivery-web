'use client';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface BairroData {
  bairro: string;
  totalPedidos: number;
}

const BarrasBairros = ({ data }: { data: BairroData[] }) => {
  const formatData = data.map(item => ({
    category: item.bairro || 'Bairro desconhecido',
    value: item.totalPedidos,
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
      margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
      width={undefined}
      height={480}
    />
  );
};

export default BarrasBairros;
