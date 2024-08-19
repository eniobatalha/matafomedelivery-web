"use client";
import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import IMask from 'imask';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';

type FormValues = {
  razaoSocial: string;
  email: string;
  cnpj: string;
  telefone: string;
  nomeFantasia?: string;
  senha: string;
  confirmarSenha: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const states = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
];

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FormValues>();
  const { toast } = useToast();
  const router = useRouter();

  const cnpjRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const cepRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cnpjRef.current) {
      IMask(cnpjRef.current, {
        mask: '00.000.000/0000-00',
        lazy: false, // So it will format instantly
        prepare: (str) => str.replace(/\D/g, '') // Remove non-numeric characters
      }).on('accept', () => {
        setValue('cnpj', cnpjRef.current?.value || '');
      });
    }

    if (telefoneRef.current) {
      IMask(telefoneRef.current, {
        mask: '(00) 00000-0000',
        lazy: false, // So it will format instantly
        prepare: (str) => str.replace(/\D/g, '') // Remove non-numeric characters
      }).on('accept', () => {
        setValue('telefone', telefoneRef.current?.value || '');
      });
    }

    if (cepRef.current) {
      IMask(cepRef.current, {
        mask: '00000-000',
        lazy: false, // So it will format instantly
        prepare: (str) => str.replace(/\D/g, '') // Remove non-numeric characters
      }).on('accept', () => {
        setValue('cep', cepRef.current?.value || '');
      });
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // URL da API onde as empresas estão registradas
      const url_api_fake_empresa = 'http://localhost:3001/empresa';
    
      // Função para verificar se o e-mail já existe
      const checkEmailExists = async (email: string) => {
        try {
          const response = await fetch(url_api_fake_empresa);
          const responseData = await response.json();
          
          // Verifica se algum restaurante tem o e-mail que está sendo verificado
          const emails = responseData.empresa.map((empresa: any) => empresa.email);
          return emails.includes(email);
        } catch (error) {
          console.error("Erro ao verificar o e-mail:", error);
          return false;
        }
      };
    
      const email = getValues('email');
      if (await checkEmailExists(email)) {
        // Se o e-mail já existir, exibe o toast de erro e para a execução
        toast({
          title: "Erro ao registrar",
          description: "Este e-mail já foi utilizado.",
          variant: "destructive",
        });
        return; // Para o fluxo, não prossegue com o registro
      }
    
      // Payload para registrar a nova empresa
      const payload = {
        razao_social: data.razaoSocial,
        nome_fantasia: data.nomeFantasia || "",
        cnpj: data.cnpj,
        email: data.email,
        password: data.senha,
        endereco: {
          cep: data.cep,
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento || "",
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
        },
        horario: "5:20 - 10:30"
      };
     
      // Registro da empresa
      const response = await axios.post(url_api_fake_empresa, payload);
    
      // Exibe mensagem de sucesso
      toast({
        title: "Registro bem-sucedido!",
        description: "A empresa foi registrada com sucesso.",
        variant: "success",
      });
    
      // Redireciona para a página de login após 3 segundos
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    
    } catch (error) {
      console.error("Erro ao registrar a empresa:", error);
    
      // Exibe mensagem de erro
      toast({
        title: "Erro ao registrar",
        description: "Houve um problema ao tentar registrar a empresa.",
        variant: "destructive",
      });
    }
  };
   

  const validatePasswords = (value: string) => {
    const senha = getValues('senha');
    return value === senha || 'As senhas não conferem.';
  };

  const searchCep = async () => {
    const cep = getValues('cep');
    if (cep) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;

        setValue('logradouro', logradouro || '');
        setValue('bairro', bairro || '');
        setValue('cidade', localidade || '');
        setValue('estado', uf || '');
      } catch (error) {
        toast({
          title: "Erro ao buscar CEP",
          description: "Não foi possível buscar o CEP.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/img/pic-register.jpg" alt="Cadastro" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center justify-start flex-1 bg-white p-8 gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl flex flex-col gap-2">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-center mt-2">Cadastro do Restaurante</h1>
          </div>

          {/* Campos do formulário */}

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="razao-social" className="text-sm font-semibold">Razão Social</Label>
              <Input
                id="razao-social"
                placeholder="Razão Social"
                {...register('razaoSocial', { required: 'Razão Social é obrigatória.' })}
                className="w-full"
              />
              {errors.razaoSocial && <p className="text-red-500 text-xs">{String(errors.razaoSocial.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
              <Input
                type="email"
                id="email"
                placeholder="E-mail"
                {...register('email', { required: 'E-mail é obrigatório.' })}
                className="w-full"
              />
              {errors.email && <p className="text-red-500 text-xs">{String(errors.email.message)}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-3">
              <Label htmlFor="cnpj" className="text-sm font-semibold">CNPJ</Label>
              <Input
                id="cnpj"
                placeholder="99.999.999/9999-99"
                {...register('cnpj', { required: 'CNPJ é obrigatório.' })}
                className="w-full"
                ref={cnpjRef}
              />
              {errors.cnpj && <p className="text-red-500 text-xs">{String(errors.cnpj.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="nome-fantasia" className="text-sm font-semibold">Nome Fantasia (opcional)</Label>
              <Input
                id="nome-fantasia"
                placeholder="Nome Fantasia"
                {...register('nomeFantasia')}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="telefone" className="text-sm font-semibold">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(99) 99999-9999"
                {...register('telefone', { required: 'Telefone é obrigatório.' })}
                className="w-full"
                ref={telefoneRef}
              />
              {errors.telefone && <p className="text-red-500 text-xs">{String(errors.telefone.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="cep" className="text-sm font-semibold">CEP</Label>
              <div className="flex">
                <Input
                  id="cep"
                  placeholder="00000-000"
                  {...register('cep', { required: 'CEP é obrigatório.' })}
                  className="w-full"
                  ref={cepRef}
                />
                <Button
                  type="button"
                  onClick={searchCep}
                  variant="orange"
                  className="ml-2"
                >
                  <FaSearch />
                </Button>
              </div>
              {errors.cep && <p className="text-red-500 text-xs">{String(errors.cep.message)}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="logradouro" className="text-sm font-semibold">Logradouro</Label>
              <Input
                id="logradouro"
                placeholder="Logradouro"
                {...register('logradouro', { required: 'Logradouro é obrigatório.' })}
                className="w-full"
              />
              {errors.logradouro && <p className="text-red-500 text-xs">{String(errors.logradouro.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="numero" className="text-sm font-semibold">Número</Label>
              <Input
                id="numero"
                placeholder="Número"
                {...register('numero', { required: 'Número é obrigatório.' })}
                className="w-full"
              />
              {errors.numero && <p className="text-red-500 text-xs">{String(errors.numero.message)}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="complemento" className="text-sm font-semibold">Complemento (opcional)</Label>
              <Input
                id="complemento"
                placeholder="Complemento"
                {...register('complemento')}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="bairro" className="text-sm font-semibold">Bairro</Label>
              <Input
                id="bairro"
                placeholder="Bairro"
                {...register('bairro', { required: 'Bairro é obrigatório.' })}
                className="w-full"
              />
              {errors.bairro && <p className="text-red-500 text-xs">{String(errors.bairro.message)}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="cidade" className="text-sm font-semibold">Cidade</Label>
              <Input
                id="cidade"
                placeholder="Cidade"
                {...register('cidade', { required: 'Cidade é obrigatória.' })}
                className="w-full"
              />
              {errors.cidade && <p className="text-red-500 text-xs">{String(errors.cidade.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="estado" className="text-sm font-semibold">Estado</Label>
              <select
                id="estado"
                {...register('estado', { required: 'Estado é obrigatório.' })}
                className="w-full border rounded px-3 py-2 shadow-md se"
              >
                <option value="">Selecione</option>
                {states.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {errors.estado && <p className="text-red-500 text-xs">{String(errors.estado.message)}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="senha" className="text-sm font-semibold">Senha</Label>
              <Input
                type="password"
                id="senha"
                placeholder="Senha"
                {...register('senha', { required: 'Senha é obrigatória.' })}
                className="w-full"
              />
              {errors.senha && <p className="text-red-500 text-xs">{String(errors.senha.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="confirmar-senha" className="text-sm font-semibold">Confirmar Senha</Label>
              <Input
                type="password"
                id="confirmar-senha"
                placeholder="Confirmar Senha"
                {...register('confirmarSenha', { required: 'Confirmação de Senha é obrigatória.', validate: validatePasswords })}
                className="w-full"
              />
              {errors.confirmarSenha && <p className="text-red-500 text-xs">{String(errors.confirmarSenha.message)}</p>}
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              type="button"
              onClick={() => router.push('/login')}
              variant="orangeLink"
            >
              Voltar para o Login
            </Button>
            <Button type="submit" variant="orange" className='w-full'>Registrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
