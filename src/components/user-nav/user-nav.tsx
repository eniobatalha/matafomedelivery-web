"use client"; // Marcar este arquivo como um componente cliente

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
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
  const [isDialogOpen, setIsDialogOpen] = useState<string | null>(null);
  const [dialogContent, setDialogContent] = useState<string>(''); // Estado para controlar o conteúdo do diálogo
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // Estado para controlar o diálogo de logout

  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [horarioAbertura, setHorarioAbertura] = useState('');
  const [horarioFechamento, setHorarioFechamento] = useState('');

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    
    if (!token) {
      // Se não houver token, redireciona para a página de login
      router.push('/login');
      return;
    }

    const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
    
    if (empresaData && empresaData.endereco) {
      setRazaoSocial(empresaData.razao_social || '');
      setNomeFantasia(empresaData.nome_fantasia || '');
      setEmail(localStorage.getItem('username') || '');
      setTelefone(empresaData.telefone || '');
      setEndereco(`${empresaData.endereco.logradouro}, ${empresaData.endereco.numero}, ${empresaData.endereco.bairro}, ${empresaData.endereco.cidade}, ${empresaData.endereco.estado}, ${empresaData.endereco.cep}`);
      setCategoria(empresaData.categoria || '');
      setHorarioAbertura(empresaData.horario_abertura || '');
      setHorarioFechamento(empresaData.horario_fechamento || '');
    }
  }, [router]); // Executa apenas uma vez ao montar o componente

  const handleOpenDialog = (content: string) => {
    setDialogContent(content);
    setIsDialogOpen(content);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(null);
  };

  const handleLogout = () => {
    // Limpa o token do cookie
    Cookies.remove('token');
    localStorage.removeItem('empresaData'); // Limpa os dados da empresa
    localStorage.removeItem('username'); // Limpa o nome de usuário

    // Redireciona para a página de login
    router.push('/login');
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
              <AvatarFallback>
                {nomeFantasia
                  .split(' ')
                  .slice(0, 2)
                  .map((name) => name.charAt(0).toUpperCase())
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{nomeFantasia}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email || 'atendimento@matafome.com'}
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
            <DropdownMenuItem
              onClick={() => handleOpenDialog('Alterar Senha')}
              className="hover:bg-orange-500 hover:text-white"
            >
              Alterar Senha
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsLogoutDialogOpen(true)}
            className="hover:bg-orange-500 hover:text-white"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Componente Dialog */}
      <Dialog open={isDialogOpen !== null} onOpenChange={(open) => open ? null : handleCloseDialog()}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent}</DialogTitle>
            <DialogDescription>
              {dialogContent === 'Gerenciar Conta'
                ? 'Aqui você pode gerenciar suas informações de conta.'
                : dialogContent === 'Gerenciar Estabelecimento'
                ? 'Aqui você pode gerenciar as informações do seu estabelecimento.'
                : 'Aqui você pode alterar sua senha.'}
            </DialogDescription>
          </DialogHeader>

          {/* Formulário dentro do Dialog */}
          <form className="space-y-4 mt-4">
            {/* Campos específicos para cada conteúdo */}
            {dialogContent === 'Gerenciar Conta' ? (
              <>
                <div>
                  <Label htmlFor="razaosocial">Razão Social</Label>
                  <Input
                    id="razaosocial"
                    type="text"
                    value={razaoSocial}
                    placeholder="Razão Social"
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="nomefantasia">Nome Fantasia</Label>
                  <Input
                    id="nomefantasia"
                    type="text"
                    value={nomeFantasia}
                    placeholder="Nome Fantasia"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="E-mail"
                    
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Telefone</Label>
                  <Input
                    id="mobile"
                    type="text"
                    value={telefone}
                    placeholder="Telefone"
                    
                  />
                </div>
              </>
            ) : dialogContent === 'Gerenciar Estabelecimento' ? (
              <>
                <div>
                  <Label htmlFor="establishment-name" className="flex mb-2">Nome do Estabelecimento</Label>
                  <Input
                    id="establishment-name"
                    type="text"
                    value={nomeFantasia}
                    placeholder="Nome do estabelecimento"
                    
                  />
                </div>

                <div>
                  <Label htmlFor="establishment-address" className="flex mb-2">Endereço</Label>
                  <Input
                    id="establishment-address"
                    type="text"
                    value={endereco}
                    placeholder="Endereço do estabelecimento"
                    
                  />
                </div>

                <div>
                  <Label htmlFor="establishment-type" className="flex mb-2">Tipo de Estabelecimento</Label>
                  <Select value={categoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hamburgueria">Hamburgueria</SelectItem>
                      <SelectItem value="sorveteria">Sorveteria</SelectItem>
                      <SelectItem value="acaiteria">Açaíteria</SelectItem>
                      <SelectItem value="lanchonete">Lanchonete</SelectItem>
                      <SelectItem value="pizzaria">Pizzaria</SelectItem>
                      <SelectItem value="comedoria">Comedoria</SelectItem>
                      <SelectItem value="churrascaria">Churrascaria</SelectItem>
                      <SelectItem value="cafeteria">Cafeteria</SelectItem>
                      <SelectItem value="padaria">Padaria</SelectItem>
                      <SelectItem value="sushibar">Sushi Bar</SelectItem>
                      <SelectItem value="restaurante">Restaurante</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4">
                  <div>
                    <Label htmlFor="opening-time" className="flex mb-2">Abre de:</Label>
                    <Input
                      id="opening-time"
                      type="time"
                      value={horarioAbertura}
                      placeholder="Horário de abertura"
                      
                    />
                  </div>
                  <div>
                    <Label htmlFor="closing-time" className="flex mb-2">Fecha de:</Label>
                    <Input
                      id="closing-time"
                      type="time"
                      value={horarioFechamento}
                      placeholder="Horário de fechamento"
                      
                    />
                  </div>
                </div>
              </>
            ) : dialogContent === 'Alterar Senha' ? (
              <>
                <div>
                  <Label htmlFor="current-password">Digite a Senha Atual</Label>
                  <Input id="current-password" type="password" placeholder="Senha Atual" />
                </div>
                <div>
                  <Label htmlFor="new-password">Digite a Nova Senha</Label>
                  <Input id="new-password" type="password" placeholder="Nova Senha" />
                </div>
                <div>
                  <Label htmlFor="confirm-new-password">Confirme a Nova Senha</Label>
                  <Input id="confirm-new-password" type="password" placeholder="Confirmar Nova Senha" />
                </div>
              </>
            ) : null}
          </form>

          <DialogFooter>
            <Button onClick={handleCloseDialog} variant="destructive">
              Fechar
            </Button>
            <Button type="submit" variant="orange">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação de logout */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Logout</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja sair?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
