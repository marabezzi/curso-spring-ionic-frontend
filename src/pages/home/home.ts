import { AuthService } from './../../services/auth.service';
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

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public auth: AuthService) {

  }

  public login(){
    this.auth.authenticate(this.creds)
    .subscribe(Response => {
      this.auth.successfulLogin(Response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  public ionViewWillEnter() {
    this.menu.swipeEnable(false);
}
  public ionViewDidLeave() {
    this.menu.swipeEnable(true);
}

ionViewDidEnter() {
  this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
}

signup() {
  this.navCtrl.push('SignupPage');
}

}
