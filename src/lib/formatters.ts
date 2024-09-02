// src/lib/formatters.ts

// Função para formatar números de telefone em links do WhatsApp
export function formatToWhatsAppLink(phoneNumber: string | undefined | null): string {
    if (!phoneNumber) {
        return "#";
    }
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = `55${cleanedNumber}`;
    return `https://wa.me/${formattedNumber}`;
}

// Função para formatar endereço em links do Google Maps
export function formatToGoogleMapsLink(endereco: any): string {
    const { logradouro, numero, bairro, cidade, estado } = endereco;
    const destination = `${logradouro} ${numero}, ${bairro}, ${cidade} ${estado}`;
    const startingPoint = "-8.11330612798356,-35.030793";
    return `https://www.google.com/maps/dir/${startingPoint}/${encodeURIComponent(destination)}`;
}

// Função para formatar datas e horas
export function formatDateTime(dateTimeString: string): string {
    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}$/;

    if (isoFormatRegex.test(dateTimeString)) {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return dateTimeString;
}

// Função para mapear o status do pedido para um valor numérico
export function mapStatus(status: string): number {
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

// Função para mapear o status de pagamento para uma string correspondente
export function mapStatusPagamento(statusPagamento: string): string {
    return statusPagamento.toLowerCase();
}
