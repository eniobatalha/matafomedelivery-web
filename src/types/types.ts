// src/types/pedido.ts

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  urlImagem: string;
  preco: number;
  adicionais?: any[]; // ou um tipo mais específico se você tiver essa informação
}

export interface ItensPedido {
  id: number;
  produto: Produto;
  quantidade: number;
}

export interface Pedido {
  id: number;
  cliente: {
      id: number;
      nome: string;
      foneCelular: string;
      cpf: string;
  };
  empresa: {
      id: number;
      nomeFantasia: string;
      horarioAbertura: string;
      horarioFechamento: string;
      tempoEntrega: string;
      imgCapa: string;
      imgPerfil: string;
      categoria: string;
      telefone: string;
      taxaFrete: number;
      endereco: {
          id: number | null;
          cep: string;
          logradouro: string;
          complemento: string;
          numero: string;
          bairro: string;
          cidade: string;
          estado: string;
      };
  };
  enderecoEntrega: {
      id: number;
      cep: string;
      logradouro: string;
      complemento: string;
      numero: string;
      bairro: string;
      cidade: string;
      estado: string;
  };
  formaPagamento: {
      tipo: string;
      numeroCartao: string;
  };
  itensPedido: ItensPedido[];
  status: string;
  dataHoraPedido: string;
  statusPagamento: string;
  taxaEntrega: number;
  valorTotal: number;
}
export type NovoProduto = Omit<Produto, 'id'>;
