import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

const UserCredentialsForm = ({ isRegistering }: { isRegistering: boolean }) => {
  const { register, formState: { errors }, getValues } = useFormContext();

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            {...register('email', { required: 'E-mail é obrigatório.' })}
            disabled={isRegistering}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            type="password"
            placeholder="Min. 8 caract."
            {...register('senha', { required: 'Senha é obrigatória.', minLength: { value: 8, message: 'A senha deve ter no mínimo 8 caracteres' } })}
            disabled={isRegistering}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
          <Input
            id="confirmarSenha"
            type="password"
            placeholder="Confirmar Senha"
            {...register('confirmarSenha', { required: 'Confirmação de Senha é obrigatória.', validate: (value) => value === getValues('senha') || 'As senhas não conferem.' })}
            disabled={isRegistering}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCredentialsForm;
