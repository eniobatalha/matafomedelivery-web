// hooks/useMaskedInput.ts
import { useEffect, useRef } from 'react';
import IMask from 'imask';

export const useMaskedInput = (mask: string, setValue: any, field: string) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      IMask(inputRef.current, {
        mask: mask,
        lazy: false,
        prepare: (str) => str.replace(/\D/g, '')
      }).on('accept', () => {
        setValue(field, inputRef.current?.value || '');
      });
    }
  }, [inputRef, mask, setValue, field]);

  return inputRef;
};
