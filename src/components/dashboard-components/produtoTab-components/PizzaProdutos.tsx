'use client'; // Isso indica que o componente deve ser renderizado no cliente

import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart';

const data_pie = [
  { id: 0, value: 20, label: 'Açaí' },
  { id: 1, value: 15, label: 'Hamburguer' },
  { id: 2, value: 10, label: 'Pizza' },
  { id: 3, value: 5, label: 'Cachorro Quente' },
  { id: 4, value: 3, label: 'Coxinha' },
];

const PizzaProdutos = () => {
  return (
    <MUIPieChart
      series={[
        {
          data: data_pie,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={350}
    />
  );
};

export default PizzaProdutos;
