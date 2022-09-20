import { ItemPedidoDTO } from './item-pedidoDTO';
import { pagamentoDTO } from './pagamentoDTO';
import { RefDTO } from './refDTO';

export interface PedidoDTO {
  cliente: RefDTO;
  enderecoDeEntrega: RefDTO;
  pagamento: pagamentoDTO;
  itens: ItemPedidoDTO[];
}
