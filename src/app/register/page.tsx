"use client";
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import axios from '@/app/axiosConfig';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { categoriaMap } from '@/lib/constants';
import EmpresaDataForm from '@/components/registerPage-components/EmpresaDataForm';
import EnderecoForm from '@/components/registerPage-components/EnderecoForm';
import UserCredentialsForm from '@/components/registerPage-components/UserCredentialsForm';

type FormValues = {
  razaoSocial: string;
  email: string;
  cnpj: string;
  telefone: string;
  nomeFantasia: string;
  senha: string;
  confirmarSenha: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  horarioAbertura: string;
  horarioFechamento: string;
  categoria: string;
};

const RegisterPage = () => {
  const methods = useForm<FormValues>();
  const { toast } = useToast();
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const searchCep = async () => {
    const cep = methods.getValues('cep');
    if (cep) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;

        methods.setValue('logradouro', logradouro || '');
        methods.setValue('bairro', bairro || '');
        methods.setValue('cidade', localidade || '');
        methods.setValue('estado', uf || '');
      } catch (error) {
        toast({
          title: "Erro ao buscar CEP",
          description: "Não foi possível buscar o CEP.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formatCNPJ = (cnpj: string) => cnpj.replace(/\D/g, '');

    try {
      setIsRegistering(true);

      const url_api_empresa = '/empresas';

      const payload = {
        email: data.email,
        password: data.senha,
        razao_social: data.razaoSocial,
        nome_fantasia: data.nomeFantasia,
        cnpj: formatCNPJ(data.cnpj),
        taxa_frete: 5,
        telefone: data.telefone,
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        complemento: data.complemento || "",
        categoria: categoriaMap[data.categoria],
        horario_abertura: data.horarioAbertura + ":00",
        horario_fechamento: data.horarioFechamento + ":00",
        tempo_entrega: "00:30:00"
      };

      await axios.post(url_api_empresa, payload);

      toast({
        title: "Registro bem-sucedido!",
        description: "A empresa foi registrada com sucesso.",
        variant: "success",
        duration: 3000,
      });

      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (error: any) {
      toast({
        title: "Erro ao registrar",
        description: error.message || "Ocorreu um erro ao tentar registrar a empresa.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleValidation = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      methods.handleSubmit(onSubmit)();
    } else {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/img/pic-register.jpg" alt="Cadastro" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center justify-start flex-1 bg-white p-8 gap-4">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastro de Restaurante</h1>
        
        <FormProvider {...methods}>
          <form className="w-full max-w-3xl flex flex-col gap-6"> {/* Espaçamento ajustado */}
            <EmpresaDataForm isRegistering={isRegistering} />
            <EnderecoForm isRegistering={isRegistering} searchCep={searchCep} />
            <UserCredentialsForm isRegistering={isRegistering} />

            <div className="flex gap-4 mt-6"> {/* Espaçamento ajustado */}
              <Button
                type="button"
                onClick={() => router.push('/login')}
                variant="orangeLink"
                disabled={isRegistering}
              >
                Voltar para o Login
              </Button>
              <Button
                type="button"
                onClick={handleValidation}
                variant="orange"
                className="w-full"
                disabled={isRegistering}
              >
                {isRegistering ? "Registrando..." : "Registrar"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default RegisterPage;
