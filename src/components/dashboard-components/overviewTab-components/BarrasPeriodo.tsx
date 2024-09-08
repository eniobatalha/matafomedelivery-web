import { BarChart } from '@mui/x-charts/BarChart';

export const BarrasPeriodo = ({ data, startDate, endDate }: { data: any, startDate: Date, endDate: Date }) => {
  const formatDateBR = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString + "T00:00:00").toLocaleDateString('pt-BR', options);
  };

  const filteredData = data?.filter((item: { dia: string }) => {
    const itemDate = new Date(item.dia + "T00:00:00").setHours(0, 0, 0, 0);
    const start = startDate.setHours(0, 0, 0, 0);
    const end = endDate.setHours(23, 59, 59, 999);
    return itemDate >= start && itemDate <= end;
  });

  const sortedData = filteredData?.sort((a: { dia: string }, b: { dia: string }) => {
    return new Date(a.dia + "T00:00:00").getTime() - new Date(b.dia + "T00:00:00").getTime();
  });

  return (
    <div style={{ width: '100%', height: '88%' }}>
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: sortedData?.map((item: { dia: string }) => formatDateBR(item.dia)),
          }
        ]}
        series={[
          {
            data: sortedData?.map((item: { valorTotal: number }) => item.valorTotal),
            color: '#FF7300',
          }
        ]}
        width={undefined} // Remove o width fixo
        height={undefined}
      />
    </div>
  );
};
