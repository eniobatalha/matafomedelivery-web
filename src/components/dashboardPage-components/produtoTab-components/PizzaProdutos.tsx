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
          innerRadius: 180,
          outerRadius: -180,
          faded: { innerRadius: 150, additionalRadius: -150, color: 'gray' },
        },
      ]}
      margin={{ top: 0, right: 0, bottom: 0, left: -300 }}
      height={480}
    />
  );
};

export default PizzaProdutos;
