import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const BarrasPeriodo = ({ data, startDate, endDate }: { data: any, startDate: Date, endDate: Date }) => {
  // Função para formatar a data no formato brasileiro
  const formatDateBR = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString + "T00:00:00").toLocaleDateString('pt-BR', options); // Garante que o fuso horário não interfira
  };

  // Filtrar os dados conforme o intervalo de datas selecionado
  const filteredData = data?.filter((item: { dia: string }) => {
    const itemDate = new Date(item.dia + "T00:00:00").setHours(0, 0, 0, 0); // Corrigir a data para evitar problema de fuso
    const start = startDate.setHours(0, 0, 0, 0);
    const end = endDate.setHours(23, 59, 59, 999);
    return itemDate >= start && itemDate <= end;
  });

  // Ordenar os dados em ordem crescente de data
  const sortedData = filteredData?.sort((a: { dia: string }, b: { dia: string }) => {
    return new Date(a.dia + "T00:00:00").getTime() - new Date(b.dia + "T00:00:00").getTime();
  });

  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart data={sortedData}>
        <XAxis
          dataKey="dia"
          tickFormatter={formatDateBR} // Formatar a data no eixo X
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(label) => `Data: ${formatDateBR(label)}`} // Exibir a data formatada no tooltip
        />
        <Bar dataKey="valorTotal" fill="#FF7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};
