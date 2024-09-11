import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import DialogDetalhesPedido from "@/components/dialog-detalhes-pedido/dialog-detalhes-pedido";

interface ActionCellProps {
  pedido: any;
}

const ActionCell: React.FC<ActionCellProps> = ({ pedido }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button variant="orangeLink" onClick={() => setDialogOpen(true)}>
        Ver Detalhes
      </Button>
      {dialogOpen && (
        <DialogDetalhesPedido
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          pedido={pedido}
        />
      )}
    </>
  );
};

export default ActionCell;
