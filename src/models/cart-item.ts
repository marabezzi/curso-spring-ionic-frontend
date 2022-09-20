import { ProdutoDTO } from './produtoDTO';

export interface CartItem {
  quantidade: number;
  produto: ProdutoDTO
}
