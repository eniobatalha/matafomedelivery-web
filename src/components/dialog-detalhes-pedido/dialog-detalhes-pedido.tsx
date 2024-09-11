import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import Tag from '@/components/tag-pedido/tag-pedido';
import CardConteudoPedido from '@/components/card-conteudo-produto/card-conteudo-pedido';
import { Button } from '@/components/ui/button';

function mapStatus(status: string): number {
    switch (status) {
        case "PENDENTE":
            return 1;
        case "PROCESSANDO":
            return 2;
        case "EM_TRANSITO":
            return 3;
        case "ENTREGUE":
            return 4;
        case "CANCELADO":
            return 5;
        default:
            return 0; // Desconhecido
    }
}

function formatDateTime(dateTimeString: string): string {
    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}$/;

    if (isoFormatRegex.test(dateTimeString)) {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return dateTimeString;
}

interface DialogDetalhesPedidoProps {
    isOpen: boolean;
    onClose: () => void;
    pedido: any;
}

const DialogDetalhesPedido: React.FC<DialogDetalhesPedidoProps> = ({ isOpen, onClose, pedido }) => {
    const totalValue = pedido.itensPedido.reduce(
        (total: number, item: any) => total + item.produto.preco * item.quantidade,
        0
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Detalhes do Pedido #{pedido.id}</DialogTitle>
                    <div className="flex gap-4 mt-4">
                        <Tag type="status" value={mapStatus(pedido.status)} />
                        <Tag type="statusPagamento" value={pedido.statusPagamento} />
                    </div>
                </DialogHeader>
                <DialogDescription>
                    <div className="mt-4">
                        <p><strong>Cliente:</strong> {pedido.cliente.nome}</p>
                        <p><strong>Endereço:</strong> {pedido.enderecoEntrega.logradouro}, {pedido.enderecoEntrega.numero} - {pedido.enderecoEntrega.bairro}, {pedido.enderecoEntrega.cidade}</p>
                        <p><strong>Data do Pedido:</strong> {formatDateTime(pedido.dataHoraPedido)}</p>
                    </div>

                    <div className="mt-6 space-y-4">
                        {pedido.itensPedido.map((item: any) => (
                            <CardConteudoPedido
                                key={item.id}
                                id={item.produto.id}
                                name={item.produto.nome}
                                image={item.produto.urlImagem}
                                description={item.produto.descricao}
                                quantity={item.quantidade}
                                unitPrice={item.produto.preco}
                                totalPrice={item.produto.preco * item.quantidade}
                                additions={item.adicionais}
                                observacao={pedido.observacao || "Não há observações."}
                            />
                        ))}
                    </div>

                    <div className="mt-4">
                        <div className="text-center text-base text-gray-500 mb-4">
                            <strong>Observações:</strong> {pedido.observacao ? pedido.observacao : "Não houveram observações."}
                        </div>
                        <p className="text-xl font-bold text-right">Valor Total: R$ {totalValue.toFixed(2)}</p>
                    </div>
                </DialogDescription>

                {/* Movendo as observações para dentro da área de descrição */}
                <DialogFooter className="flex flex-col items-start">

                    <Button variant="destructive" onClick={onClose}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogDetalhesPedido;
