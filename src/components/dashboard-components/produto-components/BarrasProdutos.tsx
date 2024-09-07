'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const colors = ['#FFA500', '#ff1020', '#FFFF00', '#8B4513', '#4CAF50'];

const data = [
  { category: 'Açaís', value: 30 },
  { category: 'Combos', value: 25 },
  { category: 'Salgados', value: 20 },
  { category: 'Pizzas', value: 15 },
  { category: 'Doces', value: 10 },
];

const colorMap = {
  type: "piecewise" as const,
  thresholds: data.map(item => item.value),
  colors: colors,
};

const BarrasProdutos = () => {
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

export default BarrasProdutos;
