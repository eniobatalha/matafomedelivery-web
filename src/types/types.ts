// types.ts
export interface Produto {
  id: string;           // ID do produto
  nome: string;         // Nome do produto
  descricao: string;    // Descrição do produto
  urlImagem: string;    // URL da imagem do produto
  preco: number;        // Preço do produto
}

// Tipo usado ao adicionar um novo produto, onde o ID não é necessário
export type NovoProduto = Omit<Produto, 'id'>;
