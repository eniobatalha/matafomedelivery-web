import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface DialogAlertaConexaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchChange?: (checked: boolean) => void;
  conexaoHabilitada?: boolean;
  title: string;
  description: string;
  showSwitch?: boolean; // Prop opcional para controlar a exibição
}

const DialogAlertaConexao: React.FC<DialogAlertaConexaoProps> = ({ isOpen, onClose, onSwitchChange, conexaoHabilitada, title, description, showSwitch = true }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {showSwitch && ( // Condicional para exibir o Switch
          <div className="flex items-center justify-between mt-4">
            <span>Ativar recebimento de pedidos</span>
            <Switch checked={conexaoHabilitada} onCheckedChange={onSwitchChange} />
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Button variant="orange" onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAlertaConexao;
