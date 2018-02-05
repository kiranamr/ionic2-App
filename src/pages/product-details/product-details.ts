import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';
import {CartPage} from '../cart/cart';
import { ProductImageDetailsPage } from '../product-image-details/product-image-details';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
  providers: [CartService,AuthService]
})
export class ProductDetailsPage {
  showControls: boolean = true;
  scale: number = 1;
  product : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService: CartService,
              public authService: AuthService 
             ) {
              cartService.loadCartList(this.authService.getLoggedUID());
  }

  showDetails(product)  : void  {
    this.navCtrl.push(ProductImageDetailsPage,product);
  }
 
  ionViewDidLoad() {
    this.product = this.navParams.data;
  }
  goBack() {
      this.navCtrl.pop();
  }
  back() {
    this.navCtrl.pop();
}
openCart() : void {
    this.navCtrl.push(CartPage);
  }

  addToCart(product)  : void  {
    console.log("product page"+product);
    this.cartService.addCartItem(this.authService.getLoggedUID(), this.product );
  }

}
