import DashboardGenericCard from "../generic-card/dashboard-generic-card";
import BarrasBairros from "./BarrasBairros";
import { TableTopClientes } from "./TableTopClientes";

const ClienteTab = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardGenericCard
          title="Novos Clientes"
          value="+41"
          subtitle="41 novos clientes no período informado"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Total de Clientes Ativos"
          value="27"
          subtitle="27 fregueses pediram mais de uma vez no período informado"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Total Clientes Cadastrados"
          value="120"
          subtitle="120 clientes fizeram cadastro no período informado"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Bairros Atendidos"
          value="14"
          subtitle="Seu negócio atende 14 bairros diferentes"
          svgIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2C8.54 2 5.5 5.54 5.5 9c0 1.58.7 3.13 1.84 4.23L12 22l4.66-8.77c1.14-1.1 1.84-2.65 1.84-4.23 0-3.46-3.04-7-6.5-7z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
          }
        />
      </div>

      {/* Inclusão dos gráficos e tabela */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="col-span-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-bold">Clientes Mais Frequentes</h3>
            <TableTopClientes />
          </div>
        </div>
        <div className="col-span-3">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-bold">Bairros Mais Frequentes</h3>
            <BarrasBairros />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClienteTab;
