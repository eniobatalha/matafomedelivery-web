import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FaSearch } from 'react-icons/fa';
import { states } from '@/lib/constants';

const EnderecoForm = ({ isRegistering, searchCep }: { isRegistering: boolean, searchCep: () => void }) => {
  const { register, setValue, formState: { errors } } = useFormContext();
  const [cep, setCep] = useState('');

  // Função para aplicar a máscara manualmente no campo de CEP
  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

    if (value.length > 8) return;  // Limita o valor a 8 dígitos

    value = value.replace(/(\d{5})(\d)/, '$1-$2');  // Aplica a máscara XXXXX-XXX

    setCep(value);  // Atualiza o estado com o valor mascarado
    setValue('cep', value);  // Atualiza o valor no formulário
  };

  return (
    <div>
      {/* CEP e Logradouro na mesma linha */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="cep">CEP</Label>
          <div className="flex">
            <Input
              id="cep"
              placeholder="00000-000"
              value={cep}
              {...register('cep', {
                required: 'CEP é obrigatório.',
                onChange: handleCepChange  // Aplica a máscara dentro do register
              })}
              disabled={isRegistering}
            />
            <Button type="button" variant="orange" onClick={searchCep} disabled={isRegistering} className="ml-2">
              <FaSearch />
            </Button>
          </div>
          {errors.cep && <p className="text-red-500 text-xs">{String(errors.cep.message)}</p>}
        </div>

        <div className="flex-1">
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input
            id="logradouro"
            placeholder="Logradouro"
            {...register('logradouro', { required: 'Logradouro é obrigatório.' })}
            disabled={isRegistering}
          />
          {errors.logradouro && <p className="text-red-500 text-xs">{String(errors.logradouro.message)}</p>}
        </div>
      </div>

      {/* Número, Complemento e Bairro em uma linha */}
      <div className="flex gap-4 mt-1">
        <div className="flex-1">
          <Label htmlFor="numero">Número</Label>
          <Input
            id="numero"
            placeholder="Número"
            {...register('numero', { required: 'Número é obrigatório.' })}
            disabled={isRegistering}
          />
          {errors.numero && <p className="text-red-500 text-xs">{String(errors.numero.message)}</p>}
        </div>

        <div className="flex-1">
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            placeholder="Complemento (opcional)"
            {...register('complemento')}
            disabled={isRegistering}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            placeholder="Bairro"
            {...register('bairro', { required: 'Bairro é obrigatório.' })}
            disabled={isRegistering}
          />
          {errors.bairro && <p className="text-red-500 text-xs">{String(errors.bairro.message)}</p>}
        </div>
      </div>

      {/* Cidade e Estado na mesma linha */}
      <div className="flex gap-4 mt-1">
        <div className="flex-1">
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            placeholder="Cidade"
            {...register('cidade', { required: 'Cidade é obrigatória.' })}
            disabled={isRegistering}
          />
          {errors.cidade && <p className="text-red-500 text-xs">{String(errors.cidade.message)}</p>}
        </div>

        <div className="flex-1">
          <Label htmlFor="estado">Estado</Label>
          <select
            id="estado"
            className="w-full border rounded px-3 py-2 shadow-md"
            {...register('estado', { required: 'Estado é obrigatório.' })}
            disabled={isRegistering}
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
    </div>
  );
};

export default EnderecoForm;
