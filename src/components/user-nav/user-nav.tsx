import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 mr-8 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" alt="@MataFome" />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">MataFome</p>
            <p className="text-xs leading-none text-muted-foreground">
              atendimento@matafome.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
            Minha Conta
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
            Cobrança
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
            Configurações
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/login" passHref>
          <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
            Log out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}