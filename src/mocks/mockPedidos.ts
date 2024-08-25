export interface Produto {
    id: string;
    name: string;
    image: string;
    description: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    additions: string[];
}

export interface EnderecoPedido {
    id: number;
    cep: string;
    logradouro: string;
    complemento: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export interface Pedido {
    id: string;
    cliente: string;
    telefone: string;
    enderecoPedido: EnderecoPedido[];
    dataHora: string;
    status: number;
    produtos: Produto[];
    total: string;
}

export const pedidosMock: Pedido[] = [
    {
        id: "109",
        cliente: "Enio Leite Batalha",
        telefone: "(81) 99744-1105",
        enderecoPedido: [
            {
                id: 1,
                cep: "54325-460",
                logradouro: "ROD. PE-07",
                complemento: "Bloco 19 Apto 203",
                numero: "KM 20",
                bairro: "Bulhões",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "24/08/24 12:31",
        status: 2,
        produtos: [
            {
                id: "1",
                name: "Black Dog Cheddar Bacon",
                image: "/img/produtos/hamburguer1.jpg",
                description: "Black Dog Cheddar Bacon",
                quantity: 3,
                unitPrice: "22,90",
                totalPrice: "68,70",
                additions: ["Pão brioche", "Queijo gorgonzola", "Maionese picante", "Cheddar"]
            },
            {
                id: "2",
                name: "Hot Dog Maximus Fomão",
                image: "/img/produtos/hotdog.jpg",
                description: "Hot Dog Maximus Fomão",
                quantity: 2,
                unitPrice: "20,00",
                totalPrice: "40,00",
                additions: ["Batata palha", "Molho especial"]
            },
            {
                id: "3",
                name: "Coca Cola 2L",
                image: "/img/produtos/coca2l.png",
                description: "Coca Cola 2L",
                quantity: 1,
                unitPrice: "10,00",
                totalPrice: "10,00",
                additions: []
            }
        ],
        total: "118,70"
    },
    {
        id: "110",
        cliente: "Jonathas Gabriel",
        telefone: "(81) 99347-9260",
        enderecoPedido: [
            {
                id: 2,
                cep: "54321-789",
                logradouro: "Rua Iracema",
                complemento: "",
                numero: "153",
                bairro: "Sucupira",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "24/08/24 14:15",
        status: 1,
        produtos: [
            {
                id: "4",
                name: "Cheeseburger",
                image: "/img/produtos/cheeseburguer1.png",
                description: "Cheeseburger",
                quantity: 2,
                unitPrice: "18,00",
                totalPrice: "36,00",
                additions: ["Cebola caramelizada", "Alface", "Tomate"]
            },
            {
                id: "5",
                name: "Batata Frita",
                image: "/img/produtos/fritas.png",
                description: "Batata Frita",
                quantity: 1,
                unitPrice: "12,00",
                totalPrice: "12,00",
                additions: ["Ketchup", "Maionese"]
            }
        ],
        total: "48,00"
    },
    {
        id: "111",
        cliente: "Giovani Feitosa",
        telefone: "(81) 99306-0822",
        enderecoPedido: [
            {
                id: 3,
                cep: "54300-000",
                logradouro: "Rua dos Girassóis",
                complemento: "",
                numero: "789",
                bairro: "Candeias",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "24/08/24 15:30",
        status: 3,
        produtos: [
            {
                id: "6",
                name: "Pizza Margherita",
                image: "/img/produtos/pizza marguerita.jpg",
                description: "Pizza Margherita",
                quantity: 1,
                unitPrice: "30,00",
                totalPrice: "30,00",
                additions: ["Manjericão", "Mussarela"]
            },
            {
                id: "7",
                name: "Refrigerante Lata",
                image: "/img/produtos/refrilata.png",
                description: "Refrigerante Lata",
                quantity: 3,
                unitPrice: "5,00",
                totalPrice: "15,00",
                additions: []
            }
        ],
        total: "45,00"
    },
    {
        id: "112",
        cliente: "Carla Martins",
        telefone: "(81) 98765-0987",
        enderecoPedido: [
            {
                id: 4,
                cep: "54321-123",
                logradouro: "Rua das Orquídeas",
                complemento: "Casa",
                numero: "321",
                bairro: "Jardim Jordão",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "24/08/24 16:45",
        status: 4,
        produtos: [
            {
                id: "8",
                name: "Spaghetti Bolognese",
                image: "/img/produtos/spaghetti.jpg",
                description: "Spaghetti Bolognese",
                quantity: 2,
                unitPrice: "28,00",
                totalPrice: "56,00",
                additions: ["Queijo parmesão", "Alho"]
            }
        ],
        total: "56,00"
    },
    {
        id: "113",
        cliente: "Felipe Lima",
        telefone: "(81) 99876-0987",
        enderecoPedido: [
            {
                id: 5,
                cep: "54330-678",
                logradouro: "Rua das Magnólias",
                complemento: "Bloco B, Apto 203",
                numero: "654",
                bairro: "Prazeres",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "24/08/24 18:00",
        status: 5,
        produtos: [
            {
                id: "9",
                name: "Coxinha",
                image: "/img/produtos/coxinha.jpg",
                description: "Coxinha",
                quantity: 6,
                unitPrice: "6,00",
                totalPrice: "36,00",
                additions: ["Ketchup", "Maionese"]
            }
        ],
        total: "36,00"
    },
    {
        id: "114",
        cliente: "Maria Silva",
        telefone: "(81) 91234-5678",
        enderecoPedido: [
            {
                id: 6,
                cep: "54332-123",
                logradouro: "Rua das Orquídeas",
                complemento: "Casa",
                numero: "987",
                bairro: "Cavaleiro",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "24/08/24 19:15",
        status: 1,
        produtos: [
            {
                id: "10",
                name: "Sandwich de Frango",
                image: "/img/produtos/sandwich.jpg",
                description: "Sandwich de Frango",
                quantity: 2,
                unitPrice: "15,00",
                totalPrice: "30,00",
                additions: ["Maionese", "Alface", "Tomate"]
            },
            {
                id: "11",
                name: "Suco de Laranja",
                image: "/img/produtos/suco.png",
                description: "Suco de Laranja",
                quantity: 1,
                unitPrice: "8,00",
                totalPrice: "8,00",
                additions: []
            }
        ],
        total: "38,00"
    },
    {
        id: "115",
        cliente: "Pedro Almeida",
        telefone: "(81) 98765-4321",
        enderecoPedido: [
            {
                id: 7,
                cep: "54321-321",
                logradouro: "Rua das Palmeiras",
                complemento: "Casa",
                numero: "333",
                bairro: "Muribeca",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "25/08/24 11:00",
        status: 2,
        produtos: [
            {
                id: "12",
                name: "Pizza Calabresa",
                image: "/img/produtos/pizza calabresa.png",
                description: "Pizza Calabresa",
                quantity: 1,
                unitPrice: "32,00",
                totalPrice: "32,00",
                additions: ["Cebola", "Azeitona preta"]
            },
            {
                id: "13",
                name: "Refrigerante Lata",
                image: "/img/produtos/refrilata.png",
                description: "Refrigerante Lata",
                quantity: 2,
                unitPrice: "5,00",
                totalPrice: "10,00",
                additions: []
            }
        ],
        total: "42,00"
    },
    {
        id: "116",
        cliente: "Sofia Ferreira",
        telefone: "(81) 99876-5432",
        enderecoPedido: [
            {
                id: 8,
                cep: "54330-987",
                logradouro: "Rua das Flores",
                complemento: "Apartamento 101",
                numero: "101",
                bairro: "Curado",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "25/08/24 12:45",
        status: 3,
        produtos: [
            {
                id: "14",
                name: "Sushi Combo",
                image: "/img/produtos/sushi.png",
                description: "Sushi Combo 20 Peças",
                quantity: 1,
                unitPrice: "50,00",
                totalPrice: "50,00",
                additions: ["Molho shoyu", "Gengibre"]
            },
            {
                id: "15",
                name: "Amasake",
                image: "/img/produtos/amasake.png",
                description: "Amasake Bebida Fermentada",
                quantity: 1,
                unitPrice: "12,00",
                totalPrice: "12,00",
                additions: []
            }
        ],
        total: "62,00"
    },
    {
        id: "117",
        cliente: "Renato Souza",
        telefone: "(81) 91234-0987",
        enderecoPedido: [
            {
                id: 9,
                cep: "54321-987",
                logradouro: "Rua do Sol",
                complemento: "Casa",
                numero: "432",
                bairro: "Cajueiro Seco",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "25/08/24 13:30",
        status: 4,
        produtos: [
            {
                id: "16",
                name: "Macarronada Italiana",
                image: "/img/produtos/macarronada.png",
                description: "Macarronada Italiana",
                quantity: 2,
                unitPrice: "25,00",
                totalPrice: "50,00",
                additions: ["Queijo parmesão", "Molho pesto"]
            },
            {
                id: "17",
                name: "Ravioli de Carne",
                image: "/img/produtos/raviole.png",
                description: "Ravioli de Carne com Molho",
                quantity: 1,
                unitPrice: "28,00",
                totalPrice: "28,00",
                additions: ["Molho de tomate", "Queijo ralado"]
            }
        ],
        total: "78,00"
    },
    {
        id: "118",
        cliente: "Fernanda Lima",
        telefone: "(81) 99876-4321",
        enderecoPedido: [
            {
                id: 10,
                cep: "54325-210",
                logradouro: "Rua das Cerejeiras",
                complemento: "Apartamento 303",
                numero: "987",
                bairro: "Piedade",
                cidade: "Jaboatão dos Guararapes",
                estado: "PE"
            }
        ],
        dataHora: "25/08/24 14:45",
        status: 1,
        produtos: [
            {
                id: "18",
                name: "Hamburger Gourmet",
                image: "/img/produtos/hamburger2.png",
                description: "Hamburger Gourmet com Queijo Suíço",
                quantity: 2,
                unitPrice: "22,00",
                totalPrice: "44,00",
                additions: ["Bacon", "Cebola caramelizada", "Molho especial"]
            },
            {
                id: "19",
                name: "Ramen",
                image: "/img/produtos/ramen.png",
                description: "Ramen Tradicional",
                quantity: 1,
                unitPrice: "35,00",
                totalPrice: "35,00",
                additions: ["Cebolinha", "Ovo"]
            }
        ],
        total: "79,00"
    }
];
