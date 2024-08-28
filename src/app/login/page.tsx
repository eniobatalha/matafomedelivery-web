"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import axios from '@/app/axiosConfig';
import { useToast } from "@/components/ui/use-toast";
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoggingIn, setIsLoggingIn] = useState(false); // Estado para controlar o estado de carregamento

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setErrors({});
        setIsLoggingIn(true); // Inicia o estado de carregamento

        const newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = 'O email é obrigatório.';
        if (!password) newErrors.password = 'A senha é obrigatória.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoggingIn(false); // Para o carregamento se houver erros
            return;
        }

        try {
            const response = await axios.post('/login', {
                username: email,
                password: password,
            });

            const { token, EmpresaData } = response.data;

            Cookies.set('token', token, { expires: 1 });
            localStorage.setItem('empresaData', JSON.stringify(EmpresaData));

            router.push('/dashboard');
        } catch (error) {
            toast({
                title: "Erro ao entrar",
                description: "E-mail ou senha inválidos. Por favor, tente novamente.",
                variant: "destructive",
                duration: 3000,
            });
        } finally {
            setIsLoggingIn(false); // Termina o estado de carregamento
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex flex-col items-center justify-center flex-1 bg-gray-100 p-8 gap-4">
                <Label htmlFor="email" className="text-2xl font-semibold text-center uppercase">Acesse sua conta</Label>
                <img
                    src="/img/logo.png"
                    alt="Logo Mata Fome Delivery"
                    className="w-64 h-auto"
                />
                <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                    <div>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                            disabled={isLoggingIn} // Desabilita o campo durante o carregamento
                        />
                        {errors.email && <p className="text-orange-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                            disabled={isLoggingIn} // Desabilita o campo durante o carregamento
                        />
                        {errors.password && <p className="text-orange-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="flex justify-end -mt-5">
                        <Button
                            variant="orangeLink"
                            type="button"
                            onClick={() => router.push('/forgot-password')}
                            disabled={isLoggingIn} // Desabilita o botão durante o carregamento
                        >
                            Esqueci a Senha
                        </Button>
                    </div>
                    <Button
                        variant="orange"
                        type="submit"
                        className="w-full"
                        disabled={isLoggingIn} // Desabilita o botão durante o carregamento
                    >
                        {isLoggingIn ? "Acessando..." : "Acessar"}
                    </Button>
                    <Button
                        variant="orangeLink"
                        className="w-full -mt-5"
                        type="button"
                        onClick={() => router.push('/register')}
                        disabled={isLoggingIn} // Desabilita o botão durante o carregamento
                    >
                        Não tenho uma conta. Criar agora!
                    </Button>
                </form>
            </div>
            <div className="flex-1">
                <img src="/img/pic-login.jpg" alt="Login" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default LoginPage;
