'use client';
import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart';

interface ProdutoData {
  nomeProduto: string;
  quantidadeVendida: number;
}

const PizzaProdutos = ({ data }: { data: ProdutoData[] }) => {
  const formatData = data.map((item, index) => ({
    id: index,
    value: item.quantidadeVendida,
    label: item.nomeProduto,
  }));

  return (
    <MUIPieChart
      series={[
        {
          data: formatData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      margin={{ top: 0, right: 0, bottom: 0, left: -300 }}
      height={480}
    />
  );
};

export default PizzaProdutos;
