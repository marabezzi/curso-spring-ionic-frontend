import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produtoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService: ProdutoService,
              public CartService: CartService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
     this.produtoService.findById(produto_id)
       .subscribe(response => {
         this.item = response;
         this.getImageUrlIfExists();
       },
       error => {});
   }

   getImageUrlIfExists() {
     this.produtoService.getImageFromBucket(this.item.id)
       .subscribe(response => {
         this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
       },
       error => {});
   }

   addToCart(produto: ProdutoDTO) {
    this.CartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
   }
}
