"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import Steps from '@/components/steps/steps';
import { useForm } from '@/hooks/useForm';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Cookies from 'js-cookie';
import axios from '@/app/axiosConfig'; // Usando axiosInstance configurado

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; otp?: string; password?: string; confirmPassword?: string }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Para controle de carregamento

  const router = useRouter();

  useEffect(() => {
    // Verifica se o token já está presente, se sim, redireciona para o dashboard
    const token = Cookies.get('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    const newErrors: { email?: string; otp?: string; password?: string; confirmPassword?: string } = {};

    if (!email) newErrors.email = 'O email é obrigatório.';
    if (currentStep === 1 && !otp) newErrors.otp = 'O código é obrigatório.';
    if (currentStep === 2) {
      if (!password) newErrors.password = 'A nova senha é obrigatória.';
      if (!confirmPassword) newErrors.confirmPassword = 'Confirme a nova senha.';
      if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true); // Ativar loading ao fazer requisições
      if (currentStep === 0) {
        // Enviar código de recuperação para o email
        await axios.post('/login/enviarCodigoDeRecuperacao', { email });
        changeStep(currentStep + 1);
      } else if (currentStep === 1) {
        // Validar código OTP enviado para o email
        await axios.post('/login/validarCodigoDeRecuperacao', {
          email,
          codigo: Number(otp),
        });
        changeStep(currentStep + 1);
      } else if (currentStep === 2) {
        // Trocar a senha do usuário
        await axios.post('/login/trocarSenha', {
          email,
          novaSenha: password,
        });
        setShowAlert(true);
        setTimeout(() => {
          router.push('/login');
        }, 4000);
      }
    } catch (error) {
      console.error('Erro ao processar solicitação:', error);
      setErrors({
        ...errors,
        otp: 'Houve um erro ao validar o código ou alterar a senha.',
      });
    } finally {
      setIsLoading(false); // Desativar loading
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push('/login');
    } else {
      changeStep(currentStep - 1);
    }
  };

  const steps = [
    <div key="step1">
      <Label htmlFor="email" className="text-sm font-semibold">Digite o email usado no cadastro</Label>
      <Input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-2"
      />
      {errors.email && <p className="text-orange-500 text-sm">{errors.email}</p>}
    </div>,
    <div key="step2">
      <Label htmlFor="otp" className="text-xs font-semibold text-center">Digite o código de verificação de 4 dígitos enviado para o seu email</Label>
      <div className="flex justify-center w-full max-w-md mt-2">
        <InputOTP maxLength={4} onChange={setOtp}> {/* Ajustado para 4 dígitos */}
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {errors.otp && <p className="text-orange-500 text-sm">{errors.otp}</p>}
    </div>,
    <div key="step3">
      <Label htmlFor="password" className="text-sm font-semibold text-center">Digite a nova senha</Label>
      <Input
        type="password"
        id="password"
        placeholder="Nova Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-2"
      />
      {errors.password && <p className="text-orange-500 text-sm">{errors.password}</p>}
      <Input
        type="password"
        id="confirmPassword"
        placeholder="Confirme a Nova Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mt-2"
      />
      {errors.confirmPassword && <p className="text-orange-500 text-sm">{errors.confirmPassword}</p>}
    </div>
  ];

  const { currentStep, currentComponent, changeStep } = useForm(steps);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100 p-8 gap-4">
        <Steps currentStep={currentStep} />
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
          {currentComponent}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {currentStep > 0 && (
                <Button type="button" variant="destructive" onClick={handleBack}>
                  Voltar
                </Button>
              )}
              {currentStep === 0 && (
                <div className="flex-row w-full">
                  <Button variant="orange" type="submit" className="w-full mb-2" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Recuperar"}
                  </Button>
                  <Button type="button" variant="orangeLink" onClick={() => router.push('/login')} className="w-full">
                    Voltar para Login
                  </Button>
                </div>
              )}
              {currentStep === 1 && <Button variant="orange" type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Validando..." : "Confirmar"}
              </Button>}
              {currentStep === 2 && <Button variant="orange" type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>}
            </div>
          </div>
        </form>
        {showAlert && (
          <Alert variant="default">
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>
              Sua senha foi alterada com sucesso. Redirecionando para a página de login.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="flex-1">
        <img src="/img/pic-forgot-password.jpg" alt="Forgot Password" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
