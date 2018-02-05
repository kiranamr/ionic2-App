import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { UpdatingProductPage } from '../updating-product/updating-product';

/**
 * Generated class for the EditProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-products',
  templateUrl: 'edit-products.html',
})
export class EditProductsPage {
  product : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductsPage');
    this.product = this.navParams.data;
  }
 backpage() {
    this.navCtrl.push(DashboardPage);
}
back() {
  this.navCtrl.pop();
}

goBack() {
  this.navCtrl.pop();
}
}
