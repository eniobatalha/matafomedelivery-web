"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const { toast } = useToast();
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

        const newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = 'O email é obrigatório.';
        if (!password) newErrors.password = 'A senha é obrigatória.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('https://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api/login', {
                username: email,
                password: password,
            });

            const { token, EmpresaData } = response.data;

            // Armazena o token no cookie (expira em 1 dia)
            Cookies.set('token', token, { expires: 1 });

            // Armazena os dados da empresa no localStorage
            localStorage.setItem('empresaData', JSON.stringify(EmpresaData));

            // Redireciona para o dashboard
            router.push('/dashboard');
        } catch (error) {
            toast({
                title: "Erro ao entrar",
                description: "E-mail ou senha inválidos. Por favor, tente novamente.",
                variant: "destructive",
            });
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
                        />
                        {errors.password && <p className="text-orange-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="flex justify-end -mt-5">
                        <Button
                            variant="orangeLink"
                            type="button"
                            onClick={() => router.push('/forgot-password')}
                        >
                            Esqueci a Senha
                        </Button>
                    </div>
                    <Button variant="orange" type="submit" className="w-full">Acessar</Button>
                    <Button variant="orangeLink" className="w-full -mt-5" type="button" onClick={() => router.push('/register')}>
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
