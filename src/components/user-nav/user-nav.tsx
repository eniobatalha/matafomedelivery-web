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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'; // Input field component
import { Label } from '@/components/ui/label'; // Label component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Select component

export function UserNav() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>(''); // Estado para controlar o conteúdo do diálogo

  const handleOpenDialog = (content: string) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

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
            {/* Botões para abrir o diálogo com diferentes conteúdos */}
            <DropdownMenuItem
              onClick={() => handleOpenDialog('Gerenciar Conta')}
              className="hover:bg-orange-500 hover:text-white"
            >
              Gerenciar Conta
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenDialog('Gerenciar Estabelecimento')}
              className="hover:bg-orange-500 hover:text-white"
            >
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
            <DialogTitle>{dialogContent}</DialogTitle>
            <DialogDescription>
              {dialogContent === 'Gerenciar Conta'
                ? 'Aqui você pode gerenciar suas informações de conta.'
                : 'Aqui você pode gerenciar as informações do seu estabelecimento.'}
            </DialogDescription>
          </DialogHeader>

          {/* Formulário dentro do Dialog */}
          <form className="space-y-4">
            {/* Campos específicos para cada conteúdo */}
            {dialogContent === 'Gerenciar Conta' ? (
              <>
                <div>
                  <Label htmlFor="name">Razão Social</Label>
                  <Input id="name" type="text" placeholder="Razão Social" />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="E-mail" />
                </div>
                <div>
                  <Label htmlFor="name">Telefone Fixo</Label>
                  <Input id="name" type="text" placeholder="Telefone Fixo" />
                </div>
                <div>
                  <Label htmlFor="name">Telefone Celular</Label>
                  <Input id="name" type="text" placeholder="Telefone Celular" />
                </div>

              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="establishment-name">Nome do Estabelecimento</Label>
                  <Input id="establishment-name" type="text" placeholder="Nome do estabelecimento" />
                </div>

                <div>
                  <Label htmlFor="establishment-address">Endereço</Label>
                  <Input id="establishment-address" type="text" placeholder="Endereço do estabelecimento" />
                </div>

                <div>
                  <Label htmlFor="establishment-type">Tipo de Estabelecimento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurante</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="shop">Loja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="working-days">Dias de Funcionamento</Label>
                  <div className="flex space-x-2">
                    {daysOfWeek.map((day) => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDaySelection(day)}
                        className={`cursor-pointer px-2 py-1 rounded-md ${
                          selectedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div>
                    <Label htmlFor="opening-time">Abre de:</Label>
                    <Input id="opening-time" type="time" />
                  </div>
                  <div>
                    <Label htmlFor="closing-time">Fecha de:</Label>
                    <Input id="closing-time" type="time" />
                  </div>
                </div>

              </>
            )}
          </form>

          <DialogFooter>
            <Button onClick={handleCloseDialog} className="bg-orange-500 text-white">
              Fechar
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
