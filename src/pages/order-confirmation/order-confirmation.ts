import { PedidoService } from './../../services/domain/pedido.service';
import { EnderecoDTO } from './../../models/enderecoDTO';
import { ClienteDTO } from './../../models/clienteDTO';
import { CartItem } from './../../models/cart-item';
import { PedidoDTO } from './../../models/pedidoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number {
    return this.cartService.total();
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
    .subscribe(Response => {
      this.cartService.createOrClearCart();
      this.codpedido = this.extractId(Response.headers.get('location'));
    },
    error => {
      if (error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
