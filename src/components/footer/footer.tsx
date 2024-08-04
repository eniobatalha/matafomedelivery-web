import { cn } from "@/lib/utils"; // Certifique-se de que o utilitário 'cn' está disponível

export function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn("bg-orange-700 text-white py-2 px-6 w-full", className)}
      {...props}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mata Fome Delivery. Todos os direitos reservados.
        </p>
        <p className="text-xs mt-2">
          <a href="" className="hover:underline">Política de Privacidade</a> | 
          <a href="" className="hover:underline"> Termos de Serviço</a>
        </p>
      </div>
    </footer>
  );
}
