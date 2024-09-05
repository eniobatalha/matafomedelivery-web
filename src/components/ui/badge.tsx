import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        novo: "bg-gray-500 text-white hover:bg-gray-600",
        emPreparo: "bg-yellow-500 text-white hover:bg-yellow-600",
        saiuParaEntrega: "bg-blue-500 text-white hover:bg-blue-600",
        entregue: "bg-green-500 text-white hover:bg-green-600",
        cancelado: "bg-red-500 text-white hover:bg-red-600",
        time: "bg-orange-500 text-white hover:bg-orange-600",
        pago: "bg-green-700 text-white hover:bg-green-800",
        pendente: "bg-yellow-600 text-white hover:bg-yellow-700",
        emAnalise: "bg-blue-400 text-white hover:bg-blue-500",
        recusado: "bg-red-600 text-white hover:bg-red-700",
        reembolsado: "bg-purple-600 text-white hover:bg-purple-700",
        falha: "bg-orange-600 text-white hover:bg-orange-700",
      },
    },
    defaultVariants: {
      variant: "novo",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
