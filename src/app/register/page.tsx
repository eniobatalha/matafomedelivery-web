"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import IMask from 'imask';
import axios from '@/app/axiosConfig';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import cx from 'classnames';
import Cookies from 'js-cookie';

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

const categorias = [
  { value: 'hamburgueria', label: 'Hamburgueria' },
  { value: 'sorveteria', label: 'Sorveteria' },
  { value: 'acaiteria', label: 'Açaíteria' },
  { value: 'lanchonete', label: 'Lanchonete' },
  { value: 'pizzaria', label: 'Pizzaria' },
  { value: 'comedoria', label: 'Comedoria' },
  { value: 'churrascaria', label: 'Churrascaria' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'padaria', label: 'Padaria' },
  { value: 'sushibar', label: 'Sushi Bar' },
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'outro', label: 'Outro' },
];

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger } = useForm<FormValues>();
  const { toast } = useToast();
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false); // Novo estado para controlar o botão

  const cnpjRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const cepRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cnpjRef.current) {
      IMask(cnpjRef.current, {
        mask: '00.000.000/0000-00',
        lazy: false,
        prepare: (str) => str.replace(/\D/g, '')
      }).on('accept', () => {
        setValue('cnpj', cnpjRef.current?.value || '');
      });
    }

    if (telefoneRef.current) {
      IMask(telefoneRef.current, {
        mask: '(00) 00000-0000',
        lazy: false,
        prepare: (str) => str.replace(/\D/g, '')
      }).on('accept', () => {
        setValue('telefone', telefoneRef.current?.value || '');
      });
    }

    if (cepRef.current) {
      IMask(cepRef.current, {
        mask: '00000-000',
        lazy: false,
        prepare: (str) => str.replace(/\D/g, '')
      }).on('accept', () => {
        setValue('cep', cepRef.current?.value || '');
      });
    }

    const token = Cookies.get('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router, setValue]);

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
          duration: 3000,
        });
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formatCNPJ = (cnpj: string) => cnpj.replace(/\D/g, '');

    try {
      setIsRegistering(true); // Ativa o estado de registrando

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
        categoria: data.categoria,
        horario_abertura: data.horarioAbertura + ":00",
        horario_fechamento: data.horarioFechamento + ":00",
        img_capa: "teste.png",
        img_perfil: "teste.png",
        tempo_entrega: "00:30:00"
      };

      const response = await axios.post(url_api_empresa, payload);

      toast({
        title: "Registro bem-sucedido!",
        description: "A empresa foi registrada com sucesso.",
        variant: "success",
        duration: 3000,
      });

      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (error) {
      console.error("Erro ao registrar a empresa:", error);

      toast({
        title: "Erro ao registrar",
        description: "Houve um problema ao tentar registrar a empresa.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsRegistering(false); // Desativa o estado de registrando
    }
  };

  const handleValidation = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      const invalidFields = Object.keys(errors);
      const invalidFieldNames = invalidFields.map((field) => {
        switch (field) {
          case 'razaoSocial':
            return 'Razão Social';
          case 'email':
            return 'E-mail';
          case 'cnpj':
            return 'CNPJ';
          case 'telefone':
            return 'Telefone';
          case 'senha':
            return 'Senha';
          case 'confirmarSenha':
            return 'Confirmação de Senha';
          case 'cep':
            return 'CEP';
          case 'logradouro':
            return 'Logradouro';
          case 'numero':
            return 'Número';
          case 'bairro':
            return 'Bairro';
          case 'cidade':
            return 'Cidade';
          case 'estado':
            return 'Estado';
          case 'horarioAbertura':
            return 'Hora de Abertura';
          case 'horarioFechamento':
            return 'Hora de Fechamento';
          case 'categoria':
            return 'Categoria';
          case 'nomeFantasia':
            return 'Nome Fantasia';
          default:
            return field;
        }
      });

      if (invalidFields.length === 1) {
        toast({
          title: "Erro de Validação",
          description: `O campo ${invalidFieldNames[0]} não foi preenchido.`,
          variant: "destructive",
          duration: 5000,
        });
      } else {
        toast({
          title: "Erro de Validação",
          description: `Existem ${invalidFields.length} campos obrigatórios não preenchidos: ${invalidFieldNames.join(', ')}.`,
          variant: "destructive",
          duration: 5000,
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
        <form className="w-full max-w-3xl flex flex-col gap-2">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-center mt-2">Cadastro do Restaurante</h1>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="razao-social" className="text-sm font-semibold">Razão Social</Label>
              <Input
                id="razao-social"
                placeholder="Razão Social"
                className={cx("w-full", { "bg-orange-100": errors.razaoSocial })}
                {...register('razaoSocial', { required: 'Razão Social é obrigatória.' })}
                disabled={isRegistering}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-3">
              <Label htmlFor="cnpj" className="text-sm font-semibold">CNPJ</Label>
              <Input
                id="cnpj"
                placeholder="99.999.999/9999-99"
                className={cx("w-full", { "bg-orange-100": errors.cnpj })}
                {...register('cnpj', { required: 'CNPJ é obrigatório.' })}
                ref={cnpjRef}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="nome-fantasia" className="text-sm font-semibold">Nome Fantasia</Label>
              <Input
                id="nome-fantasia"
                placeholder="Nome Fantasia"
                className={cx("w-full", { "bg-orange-100": errors.nomeFantasia })}
                {...register('nomeFantasia', { required: 'Nome Fantasia é obrigatório.' })}
                disabled={isRegistering}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="telefone" className="text-sm font-semibold">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(99) 99999-9999"
                className={cx("w-full", { "bg-orange-100": errors.telefone })}
                {...register('telefone', { required: 'Telefone é obrigatório.' })}
                ref={telefoneRef}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="cep" className="text-sm font-semibold">CEP</Label>
              <div className="flex">
                <Input
                  id="cep"
                  placeholder="00000-000"
                  className={cx("w-full", { "bg-orange-100": errors.cep })}
                  {...register('cep', { required: 'CEP é obrigatório.' })}
                  ref={cepRef}
                  disabled={isRegistering}
                />
                <Button
                  type="button"
                  onClick={searchCep}
                  variant="orange"
                  className="ml-2"
                  disabled={isRegistering}
                >
                  <FaSearch />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="logradouro" className="text-sm font-semibold">Logradouro</Label>
              <Input
                id="logradouro"
                placeholder="Logradouro"
                className={cx("w-full", { "bg-orange-100": errors.logradouro })}
                {...register('logradouro', { required: 'Logradouro é obrigatório.' })}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="numero" className="text-sm font-semibold">Número</Label>
              <Input
                id="numero"
                placeholder="Número"
                className={cx("w-full", { "bg-orange-100": errors.numero })}
                {...register('numero', { required: 'Número é obrigatório.' })}
                disabled={isRegistering}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="complemento" className="text-sm font-semibold">Complemento (opcional)</Label>
              <Input
                id="complemento"
                placeholder="Complemento"
                className={cx("w-full", { "bg-orange-100": errors.complemento })}
                {...register('complemento')}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="bairro" className="text-sm font-semibold">Bairro</Label>
              <Input
                id="bairro"
                placeholder="Bairro"
                className={cx("w-full", { "bg-orange-100": errors.bairro })}
                {...register('bairro', { required: 'Bairro é obrigatório.' })}
                disabled={isRegistering}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="cidade" className="text-sm font-semibold">Cidade</Label>
              <Input
                id="cidade"
                placeholder="Cidade"
                className={cx("w-full", { "bg-orange-100": errors.cidade })}
                {...register('cidade', { required: 'Cidade é obrigatória.' })}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="estado" className="text-sm font-semibold">Estado</Label>
              <select
                id="estado"
                className={cx("w-full border rounded px-3 py-2 shadow-md se", { "bg-orange-100": errors.estado })}
                {...register('estado', { required: 'Estado é obrigatório.' })}
              >
                <option value="">Selecione</option>
                {states.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-2">
              <Label htmlFor="opening-time" className="flex mb-2">Abertura</Label>
              <Input
                id="opening-time"
                type="time"
                className={cx({ "bg-orange-100": errors.horarioAbertura })}
                {...register('horarioAbertura', { required: 'Hora de Abertura é obrigatória.' })}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-2">
              <Label htmlFor="closing-time" className="flex mb-2">Fechamento</Label>
              <Input
                id="closing-time"
                type="time"
                className={cx({ "bg-orange-100": errors.horarioFechamento })}
                {...register('horarioFechamento', { required: 'Hora de Fechamento é obrigatória.' })}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="categoria" className="flex mb-2">Categoria</Label>
              <select
                id="categoria"
                className={cx("w-full border rounded px-3 py-2 shadow-md", { "bg-orange-100": errors.categoria })}
                {...register('categoria', { required: 'Categoria é obrigatória.' })}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(categoria => (
                  <option key={categoria.value} value={categoria.value}>
                    {categoria.label}
                  </option>
                ))}
              </select>
              {errors.categoria && <p className="text-red-500 text-xs">{String(errors.categoria.message)}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
              <Input
                type="email"
                id="email"
                placeholder="E-mail"
                className={cx("w-full", { "bg-orange-100": errors.email })}
                {...register('email', { required: 'E-mail é obrigatório.' })}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-2">
              <Label htmlFor="senha" className="text-sm font-semibold">Senha</Label>
              <Input
                type="password"
                id="senha"
                placeholder="Min. 8 caract."
                className={cx("w-full", { "bg-orange-100": errors.senha })}
                {...register('senha', { required: 'Senha é obrigatória.' })}
                disabled={isRegistering}
              />
            </div>
            <div className="flex-2">
              <Label htmlFor="confirmar-senha" className="text-sm font-semibold">Confirmar Senha</Label>
              <Input
                type="password"
                id="confirmar-senha"
                placeholder="Confirmar Senha"
                className={cx("w-full", { "bg-orange-100": errors.confirmarSenha })}
                {...register('confirmarSenha', { required: 'Confirmação de Senha não preenchido ou As senhas não estão iguais.', validate: validatePasswords })}
                disabled={isRegistering}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              type="button"
              onClick={() => router.push('/login')}
              variant="orangeLink"
              disabled={isRegistering}
            >
              Voltar para o Login
            </Button>
            <Button type="button" variant="orange" className='w-full' onClick={handleValidation} disabled={isRegistering}>
              {isRegistering ? "Registrando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
