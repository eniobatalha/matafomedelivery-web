// Ajuste no useFormRegister para incluir `formState`
import { useForm, SubmitHandler, FieldValues, UseFormRegisterReturn, Path } from 'react-hook-form';

type UseFormRegisterResult<TFieldValues extends FieldValues> = {
  register: (name: Path<TFieldValues>) => UseFormRegisterReturn;
  handleSubmit: (onValid: SubmitHandler<TFieldValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: any;
  setValue: (name: Path<TFieldValues>, value: any) => void;
  getValues: () => TFieldValues;
  trigger: () => Promise<boolean>;
  formState: { errors: any }; // Adicione isso para acessar `errors`
};

export function useFormRegister<TFieldValues extends FieldValues>(): UseFormRegisterResult<TFieldValues> {
  const { register, handleSubmit, formState, setValue, getValues, trigger } = useForm<TFieldValues>();

  return {
    register,
    handleSubmit,
    errors: formState.errors, // Agora acessa os erros corretamente
    setValue,
    getValues,
    trigger,
    formState, // Inclua formState
  };
}
