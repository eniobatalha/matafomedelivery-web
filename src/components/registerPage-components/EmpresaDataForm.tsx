import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { categorias } from '@/lib/constants';

const EmpresaDataForm = ({ isRegistering }: { isRegistering: boolean }) => {
    const { register, setValue, formState: { errors } } = useFormContext();
    const [cnpj, setCnpj] = useState('');

    // Função para aplicar a máscara manualmente no campo de CNPJ
    const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

        if (value.length > 14) return;  // Limita o valor a 14 dígitos antes da formatação

        value = value.replace(/^(\d{2})(\d)/, '$1.$2');     // Adiciona o primeiro ponto
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona o segundo ponto
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');  // Adiciona a barra
        value = value.replace(/(\d{4})(\d)/, '$1-$2');     // Adiciona o traço

        setCnpj(value);  // Atualiza o estado com o valor mascarado
        setValue('cnpj', value);  // Atualiza o valor no formulário
    };


    return (
        <div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <Label htmlFor="razao-social">Razão Social</Label>
                    <Input
                        id="razao-social"
                        placeholder="Razão Social"
                        {...register('razaoSocial', { required: 'Razão Social é obrigatória.' })}
                        disabled={isRegistering}
                    />
                    {errors.razaoSocial && <p className="text-red-500 text-xs">{String(errors.razaoSocial.message)}</p>}
                </div>

                <div className="flex-1">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                        id="cnpj"
                        placeholder="99.999.999/9999-99"
                        value={cnpj}
                        onChange={handleCnpjChange}  // Aplica a máscara ao digitar
                        disabled={isRegistering}
                    />
                    {errors.cnpj && <p className="text-red-500 text-xs">{String(errors.cnpj.message)}</p>}
                </div>
            </div>

            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                    <Input
                        id="nome-fantasia"
                        placeholder="Nome Fantasia"
                        {...register('nomeFantasia', { required: 'Nome Fantasia é obrigatório.' })}
                        disabled={isRegistering}
                    />
                    {errors.nomeFantasia && <p className="text-red-500 text-xs">{String(errors.nomeFantasia.message)}</p>}
                </div>

                <div className="flex-1">
                    <Label htmlFor="categoria">Categoria</Label>
                    <select
                        id="categoria"
                        className="w-full border rounded px-3 py-2 shadow-md"
                        {...register('categoria', { required: 'Categoria é obrigatória.' })}
                        disabled={isRegistering}
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

            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="horarioAbertura">Abertura</Label>
                    <Input
                        id="horarioAbertura"
                        type="time"
                        {...register('horarioAbertura', { required: 'Hora de Abertura é obrigatória.' })}
                        disabled={isRegistering}
                    />
                    {errors.horarioAbertura && <p className="text-red-500 text-xs">{String(errors.horarioAbertura.message)}</p>}
                </div>

                <div className="flex-1">
                    <Label htmlFor="horarioFechamento">Fechamento</Label>
                    <Input
                        id="horarioFechamento"
                        type="time"
                        {...register('horarioFechamento', { required: 'Hora de Fechamento é obrigatória.' })}
                        disabled={isRegistering}
                    />
                    {errors.horarioFechamento && <p className="text-red-500 text-xs">{String(errors.horarioFechamento.message)}</p>}
                </div>
            </div>
        </div>
    );
};

export default EmpresaDataForm;
