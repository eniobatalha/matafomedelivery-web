"use client";

import { usePathname } from "next/navigation";
import { PedidoProvider } from "@/context/PedidoContext";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define quais rotas são protegidas
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/pedidos") ||
    pathname.startsWith("/cardapio") ||
    pathname.startsWith("/historico");

  if (isProtectedRoute) {
    return <PedidoProvider>{children}</PedidoProvider>;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
