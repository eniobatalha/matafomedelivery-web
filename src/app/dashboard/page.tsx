"use client";
import MenuCompleto from '@/components/menu-completo/menu-completo';
import { Footer } from '@/components/footer/footer';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import OverviewTab from '@/components/dashboard-components/overviewTab-components/OverviewTab';
import ProdutoTab from '@/components/dashboard-components/produtoTab-components/ProdutoTab';
import ClienteTab from '@/components/dashboard-components/clienteTab-components/ClienteTab';

const DashboardPage = () => {
  return (
    <>
      <MenuCompleto />

      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col space-y-2 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>

          {/* Tabs e Conteúdo */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview Analytics</TabsTrigger>
              <TabsTrigger value="produto">Produto Analytics</TabsTrigger>
              <TabsTrigger value="cliente">Cliente Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="produto">
              <ProdutoTab />
            </TabsContent>

            <TabsContent value="cliente">
              <ClienteTab />
            </TabsContent>

          </Tabs>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
