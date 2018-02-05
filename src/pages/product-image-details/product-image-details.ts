import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerDirective } from 'ionic-img-viewer';

/**
 * Generated class for the ProductImageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-image-details',
  templateUrl: 'product-image-details.html',
  
})
export class ProductImageDetailsPage {
  showControls: boolean = true;
  scale: number = 1;
  product : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  afterZoomIn (event) {
    console.log('After ZoomIn Event: ', event);
  }
  
  afterZoomOut (event) {
    console.log('After ZoomOut Event: ', event);
  }
  ionViewDidLoad() {
    this.product = this.navParams.data;
    console.log('ionViewDidLoad ProductImageDetailsPage');
  }
  back() {
    this.navCtrl.pop();
}
  goBack() {
    this.navCtrl.pop();
}
}
