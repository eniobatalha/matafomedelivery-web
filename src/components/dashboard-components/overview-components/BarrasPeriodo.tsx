import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const BarrasPeriodo = ({ data, startDate, endDate }: { data: any, startDate: Date, endDate: Date }) => {
  // Formatar a data no formato brasileiro
  const formatDateBR = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Filtrar os dados conforme o intervalo de datas selecionado
  const filteredData = data.filter((item: { dia: string }) => {
    const itemDate = new Date(item.dia);
    return itemDate >= startDate && itemDate <= endDate;
  });

  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart data={filteredData}>
        <XAxis 
          dataKey="dia" 
          tickFormatter={formatDateBR} // Formatar a data no eixo X
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="valorTotal" fill="#FF7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};
