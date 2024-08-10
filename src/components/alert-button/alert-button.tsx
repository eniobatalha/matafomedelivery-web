"use client";
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { GrUpdate } from 'react-icons/gr';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const AlertButton: React.FC = () => {
  const handleClick = () => {
    const audio = new Audio('/sounds/alert.mp3');
    audio.play();
  };

  return (
    <DialogTrigger asChild>
        <Button onClick={handleClick} variant="outlineOrange" type="button" className='gap-2'>
            <GrUpdate />
            Atualizar
        </Button>
    </DialogTrigger>
  );
};

export default AlertButton;