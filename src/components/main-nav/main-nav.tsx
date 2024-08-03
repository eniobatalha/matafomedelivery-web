import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { MdMenuBook, MdHistory } from "react-icons/md";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="flex items-center text-sm text-white font-medium transition-colors  hover:text-orange-700"
      >
        <FaHome className="mr-2" />
        Início
      </Link>
      <Link
        href="/acompanhar-pedidos"
        className="flex items-center text-sm text-white font-medium transition-colors  hover:text-orange-700"
      >
        <GiKnifeFork className="mr-2" />
        Acompanhar Pedidos
      </Link>
      <Link
        href="/cardapio"
        className="flex items-center text-sm text-white font-medium transition-colors hover:text-orange-700"
      >
        <MdMenuBook className="mr-2" />
        Cardápio
      </Link>
      <Link
        href="/payments"
        className="flex items-center text-sm text-white font-medium transition-colors hover:text-orange-700"
      >
        <MdHistory className="mr-2" />
        Histórico de Pedidos
      </Link>
    </nav>
    
  );
}
