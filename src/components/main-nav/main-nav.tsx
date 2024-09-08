import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiKnifeFork } from "react-icons/gi";
import { FaChartBar } from "react-icons/fa";
import { MdMenuBook, MdHistory } from "react-icons/md";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname(); // Obtém o pathname atual

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: FaChartBar },
    { href: "/pedidos", label: "Acompanhar Pedidos", icon: GiKnifeFork },
    { href: "/cardapio", label: "Cardápio", icon: MdMenuBook },
    { href: "/historico", label: "Histórico de Pedidos", icon: MdHistory },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center text-sm font-semibold transition-colors", // Aumenta o tamanho do texto
              isActive ? "text-orange-800 cursor-default text-md" : "text-white hover:text-orange-800", // Destaca a página ativa
              isActive && "pointer-events-none" // Desativa clique na página ativa
            )}
          >
            <Icon className="mr-2" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
