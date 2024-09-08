import { useState } from 'react';
import axios from 'axios';

export const useCepSearch = (setValue: Function, toast: Function) => {
  const searchCep = async (cep: string) => {
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
  };

  return { searchCep };
};
