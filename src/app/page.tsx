"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      router.push('/dashboard'); // Redireciona para o dashboard se estiver logado
    } else {
      router.push('/login'); // Redireciona para login se não estiver logado
    }
  }, [router]);

  return null;
}
