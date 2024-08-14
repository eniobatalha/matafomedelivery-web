'use client'; // Isso indica que o componente deve ser renderizado no cliente
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const colors = ['#ff1020', '#FFA500', '#FFFF00', '#8B4513', '#4CAF50'];

const data = [
  { category: 'Engenho Velho', value: 60 },
  { category: 'Vila Rica', value: 59 },
  { category: 'Piedade', value: 30 },
  { category: 'Cajueiro Seco', value: 23 },
  { category: 'Muribeca', value: 16 },
];

const colorMap = {
  type: "piecewise" as const,
  thresholds: data.map(item => item.value),
  colors: colors,
};

const BairroBars = () => {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: 'band',
          data: data.map(item => item.category),
          colorMap: colorMap,
        }
      ]}
      series={[
        {
          data: data.map(item => item.value),
        }
      ]}
      width={500}
      height={400}
    />
  );
};

export default BairroBars;
