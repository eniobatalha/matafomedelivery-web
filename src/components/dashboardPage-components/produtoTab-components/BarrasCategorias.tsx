'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface CategoriaData {
  nomeCategoria: string;
  quantidadeVendida: number;
}

// Function to abbreviate the last word if there are multiple words
const abbreviateLastWord = (category: string) => {
  const words = category.split(' '); // Split the string into words
  if (words.length === 1) {
    return category; // If there's only one word, return it as is
  }
  const lastWord = words.pop(); // Get the last word
  return `${words.join(' ')} ${lastWord![0]}.`; // Abbreviate the last word and return the string
};

const BarrasCategorias = ({ data }: { data: CategoriaData[] }) => {
  const formatData = data.map(item => ({
    category: abbreviateLastWord(item.nomeCategoria) || 'Categoria sem Nome',
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
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      width={undefined}
      height={490}
    />
  );
};

export default BarrasCategorias;
