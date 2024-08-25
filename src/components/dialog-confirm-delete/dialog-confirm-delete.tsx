import React from "react";
import { Button } from "@/components/ui/button";

interface DialogConfirmDeleteProps {
    onConfirm: () => void;
    onCancel: () => void;
    message?: string; // Mensagem opcional para exibir no diálogo
}

const DialogConfirmDelete: React.FC<DialogConfirmDeleteProps> = ({ onConfirm, onCancel, message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">{message || "Tem certeza que deseja excluir este item?"}</h3>
                <div className="flex justify-end gap-4">
                    <Button onClick={onCancel} variant="outline">Cancelar</Button>
                    <Button onClick={onConfirm} variant="destructive">Excluir</Button>
                </div>
            </div>
        </div>
    );
};

export default DialogConfirmDelete;
