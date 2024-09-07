"use client";

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

import DialogMudarSenha from '../dialog-mudar-senha/dialog-mudar-senha';
import DialogConfirmarLogout from '../dialog-confirmar-logout/dialog-confirmar-logout';
import DialogGerenciarDadosEmpresa from '../dialog-gerenciar-dados-empresa/dialog-gerenciar-dados-empresa';
import DialogGerenciarEndereco from '../dialog-gerenciar-endereco-empresa/dialog-gerenciar-endereco-empresa';
import DialogGerenciarImagens from '../dialog-gerenciar-imagens/dialog-gerenciar-imagens';

export function UserNav() {
  const [isDialogOpen, setIsDialogOpen] = useState<string | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState(0);
  const [imgPerfilAtual, setImgPerfilAtual] = useState('');
  const [imgCapaAtual, setImgCapaAtual] = useState('');
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
      router.push('/login');
      return;
    }

    const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
    if (empresaData && empresaData.endereco) {
      setIdEmpresa(empresaData.id);
      setRazaoSocial(empresaData.razaoSocial || '');
      setNomeFantasia(empresaData.nomeFantasia || '');
      setEmail(empresaData.usuario.username || '');
      setTelefone(empresaData.telefone || '');
      setEndereco(`${empresaData.endereco.logradouro}, ${empresaData.endereco.numero}, ${empresaData.endereco.bairro}, ${empresaData.endereco.cidade}, ${empresaData.endereco.estado}, ${empresaData.endereco.cep}`);
      setCategoria(empresaData.categoria || '');
      setHorarioAbertura(empresaData.horarioAbertura || '');
      setHorarioFechamento(empresaData.horarioFechamento || '');
      setImgPerfilAtual(empresaData.imgPerfil || '');
      setImgCapaAtual(empresaData.imgCapa || '');
    }
  }, [router]);

  const handleOpenDialog = (content: string) => {
    setIsDialogOpen(content);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(null);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('empresaData');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const handleUpdateField = (field: string, value: string) => {
    switch (field) {
      case 'razaoSocial':
        setRazaoSocial(value);
        break;
      case 'nomeFantasia':
        setNomeFantasia(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'telefone':
        setTelefone(value);
        break;
      case 'endereco':
        setEndereco(value);
        break;
      case 'categoria':
        setCategoria(value);
        break;
      case 'horarioAbertura':
        setHorarioAbertura(value);
        break;
      case 'horarioFechamento':
        setHorarioFechamento(value);
        break;
      default:
        break;
    }
  };

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
            <DropdownMenuItem
              onClick={() => handleOpenDialog('Gerenciar Imagens')}
              className="focus:bg-orange-500 focus:text-white"
            >
              Gerenciar Imagens
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleOpenDialog('Gerenciar Informações da Empresa')}
              className="focus:bg-orange-500 focus:text-white"
            >
              Gerenciar Informações
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenDialog('Gerenciar Endereço da Empresa')}
              className="focus:bg-orange-500 focus:text-white"
            >
              Gerenciar Endereço
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenDialog('Alterar Senha')}
              className="focus:bg-orange-500 focus:text-white"
            >
              Alterar Senha
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsLogoutDialogOpen(true)}
            className="focus:bg-orange-500 focus:text-white"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogGerenciarImagens
        isOpen={isDialogOpen === 'Gerenciar Imagens'}
        onClose={handleCloseDialog}
        empresaId={idEmpresa} // ID da empresa
        imgPerfilAtual={imgPerfilAtual} // Imagem de perfil atual
        imgCapaAtual={imgCapaAtual} // Imagem de capa atual
      />


      <DialogGerenciarDadosEmpresa
        isOpen={isDialogOpen === 'Gerenciar Informações da Empresa'}
        onClose={handleCloseDialog}
        razaoSocial={razaoSocial}
        nomeFantasia={nomeFantasia}
        telefone={telefone}
        categoria={categoria}
        horarioAbertura={horarioAbertura}
        horarioFechamento={horarioFechamento}
        onUpdate={handleUpdateField}
      />


      <DialogGerenciarEndereco
        isOpen={isDialogOpen === 'Gerenciar Endereço da Empresa'}
        onClose={handleCloseDialog}
        endereco={endereco}
        onUpdate={handleUpdateField}
      />

      <DialogMudarSenha
        isOpen={isDialogOpen === 'Alterar Senha'}
        onClose={handleCloseDialog}
      />

      <DialogConfirmarLogout
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirmLogout={handleLogout}
      />
    </>
  );
}
