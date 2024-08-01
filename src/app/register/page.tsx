"use client";
import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from 'react-hook-form';
import IMask from 'imask';
import BackButton from '@/components/backbutton';

type FormValues = {
  razaoSocial: string;
  email: string;
  cnpj: string;
  telefone: string;
  nomeFantasia?: string;
  senha: string;
  confirmarSenha: string;
};

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FormValues>();

  const cnpjRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cnpjRef.current) {
      const cnpjMask = IMask(cnpjRef.current, {
        mask: '00.000.000/0000-00',
      });
      cnpjRef.current.addEventListener('blur', () => {
        setValue('cnpj', cnpjMask.value);
      });
    }
    if (telefoneRef.current) {
      const telefoneMask = IMask(telefoneRef.current, {
        mask: '(00)00000-0000',
      });
      telefoneRef.current.addEventListener('blur', () => {
        setValue('telefone', telefoneMask.value);
      });
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted:', data);
  };

  const validatePasswords = (value: string) => {
    const senha = getValues('senha');
    return value === senha || 'As senhas não conferem.';
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/img/pic-register.jpg" alt="Login" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 bg-white p-8 gap-4">

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl flex flex-col gap-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center">Cadastro do Restaurante</h1>
          </div>

          <div>
            <Label htmlFor="razao-social" className="text-base font-semibold">Razão Social</Label>
            <Input
              id="razao-social"
              placeholder="Razão Social"
              {...register('razaoSocial', { required: 'Razão Social é obrigatória.' })}
              className="w-full"
            />
            {errors.razaoSocial && <p className="text-orange-500 text-sm">{String(errors.razaoSocial.message)}</p>}
          </div>
          <div>
            <Label htmlFor="email" className="text-base font-semibold">E-mail</Label>
            <Input
              type="email"
              id="email"
              placeholder="E-mail"
              {...register('email', { required: 'E-mail é obrigatório.' })}
              className="w-full"
            />
            {errors.email && <p className="text-orange-500 text-sm">{String(errors.email.message)}</p>}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="cnpj" className="text-base font-semibold">CNPJ</Label>
              <Input
                id="cnpj"
                placeholder="99.999.999/9999-99"
                {...register('cnpj', { required: 'CNPJ é obrigatório.' })}
                className="w-full"
                ref={cnpjRef}
              />
              {errors.cnpj && <p className="text-orange-500 text-sm">{String(errors.cnpj.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="telefone" className="text-base font-semibold">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(99)99999-9999"
                {...register('telefone', { required: 'Telefone é obrigatório.' })}
                className="w-full"
                ref={telefoneRef}
              />
              {errors.telefone && <p className="text-orange-500 text-sm">{String(errors.telefone.message)}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="nome-fantasia" className="text-base font-semibold">Nome Fantasia (opcional)</Label>
            <Input
              id="nome-fantasia"
              placeholder="Nome Fantasia"
              {...register('nomeFantasia')}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="senha" className="text-base font-semibold">Senha</Label>
              <Input
                type="password"
                id="senha"
                placeholder="Senha"
                {...register('senha', { required: 'Senha é obrigatória.' })}
                className="w-full"
              />
              {errors.senha && <p className="text-orange-500 text-sm">{String(errors.senha.message)}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="confirmar-senha" className="text-base font-semibold">Confirmar Senha</Label>
              <Input
                type="password"
                id="confirmar-senha"
                placeholder="Confirmar Senha"
                {...register('confirmarSenha', { 
                  required: 'Confirmar Senha é obrigatória.',
                  validate: validatePasswords
                })}
                className="w-full"
              />
              {errors.confirmarSenha && <p className="text-orange-500 text-sm">{String(errors.confirmarSenha.message)}</p>}
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="orange" type="submit" className="w-full">Registrar</Button>
            <BackButton/>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
