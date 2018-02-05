import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderDetailsForAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details-for-admin',
  templateUrl: 'order-details-for-admin.html',
})
export class OrderDetailsForAdminPage {
  product : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsForAdminPage');
    this.product = this.navParams.data;
  }
  goBack() {
    this.navCtrl.pop();
  }
  back() {
    this.navCtrl.pop();
  }
}
