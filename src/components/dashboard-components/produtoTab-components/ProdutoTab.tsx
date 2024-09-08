import DashboardGenericCard from "../generic-card/dashboard-generic-card";
import BarrasProdutos from "./BarrasProdutos";
import PizzaProdutos from "./PizzaProdutos";


const ProdutoTab = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardGenericCard
          title="Produto Mais Vendido"
          value="Produto Teste 1"
          subtitle="68 vezes pedido no período selecionado"
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
              <path d="M3 18l9-6 9 6V6l-9-6-9 6v12z" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Produto Mais Lucrativo"
          value="Produto Teste 2"
          subtitle="R$713,75 de lucro no período selecionado"
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
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Categoria Mais Vendida"
          value="Categoria Teste 7"
          subtitle="81 vezes pedida no período selecionado"
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
              <path d="M3 18l9-6 9 6V6l-9-6-9 6v12z" />
            </svg>
          }
        />

        <DashboardGenericCard
          title="Categoria Mais Lucrativa"
          value="Categoria Teste 7"
          subtitle="R$975,25 de lucro no período selecionado"
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
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
      </div>

      {/* Inclusão dos gráficos de pizza e barras */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="col-span-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-bold">Produtos Mais Vendidos</h3>
            <PizzaProdutos />
          </div>
        </div>
        <div className="col-span-3">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-bold">Categorias Mais Vendidas</h3>
            <BarrasProdutos />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdutoTab;
