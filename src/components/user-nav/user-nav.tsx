"use client"; // Marcar este arquivo como um componente cliente

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from '@/components/ui/dialog'; // Importe os componentes do Dialog

export function UserNav() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Estado para controlar a abertura do diálogo

  const handleOpenDialog = () => {
    setIsDialogOpen(true); // Abre o diálogo
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Fecha o diálogo
  };

  return (
    <>
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
            {/* Botão para abrir o diálogo */}
            <DropdownMenuItem onClick={handleOpenDialog} className="hover:bg-orange-500 hover:text-white">
              Gerenciar Conta
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-orange-500 hover:text-white">
              Gerenciar Estabelecimento
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

      {/* Componente Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerenciar Conta</DialogTitle>
            <DialogDescription>
              Aqui você pode gerenciar suas informações de conta.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {/* Conteúdo do diálogo */}
            <p>Adicione seu conteúdo ou formulário aqui.</p>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseDialog} className="bg-orange-500 text-white">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
