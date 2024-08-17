"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import Steps from '@/components/steps/steps';
import { useForm } from '@/hooks/useForm';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; otp?: string; password?: string; confirmPassword?: string }>({});
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
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

    if (currentStep < 2) {
      changeStep(currentStep + 1);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        router.push('/login');
      }, 4000);
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
      <Label htmlFor="otp" className="text-sm font-semibold">Digite o email usado no cadastro</Label>
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
      <Label htmlFor="otp" className="text-xs font-semibold text-center">Digite o código de verificação que foi enviado para o seu email</Label>
      <div className="flex justify-center w-full max-w-md mt-2">
        <InputOTP maxLength={6} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {errors.otp && <p className="text-orange-500 text-sm">{errors.otp}</p>}
    </div>,
    <div key="step3">
      <Label htmlFor="otp" className="text-sm font-semibold text-center">Digite a nova senha</Label>
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
          <div className="flex gap-4">
            {currentStep > 0 && (
              <Button type="button" variant="destructive" onClick={handleBack}>
                Voltar
              </Button>
            )}
            {currentStep === 0 && <Button variant="orange" type="submit" className="w-full">Recuperar</Button>}
            {currentStep === 1 && <Button variant="orange" type="submit" className="w-full">Confirmar</Button>}
            {currentStep === 2 && <Button variant="orange" type="submit" className="w-full">Salvar</Button>}
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
