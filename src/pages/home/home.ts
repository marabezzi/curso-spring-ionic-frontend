import { CredenciaisDTO } from './../../models/credenciaisDTO';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  public login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

  public ionViewWillEnter() {
    this.menu.swipeEnable(false);
}
  public ionViewDidLeave() {
    this.menu.swipeEnable(true);
}
}
