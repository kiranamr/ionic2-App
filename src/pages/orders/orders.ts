import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';

import {FirebaseListObservable, AngularFireDatabase} from 'angularfire2/database';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';
import { ProductsPage } from '../products/products';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [CartService,AuthService]
})
export class OrdersPage {
  orders :FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService: CartService,
              public alertCtrl: AlertController,public db: AngularFireDatabase,
              public authService: AuthService, public menu: MenuController
            ) {
              menu.enable(true);
    cartService.loadOrders(this.authService.getLoggedUID());
    this.orders = this.cartService.orderItems;
  }
  openMenu(evt) {
    if(evt === "user"){
       this.menu.enable(true, 'menu1');
       this.menu.enable(false, 'menu2');
    }else{
       this.menu.enable(true, 'menu2');
       this.menu.enable(false, 'menu1');
    }
    this.menu.toggle();
}
  deleteOrder(address:any) : void{

    const commentList = this.db.list('orderuserID/', {
      preserveSnapshot: true,
      query: {
        orderByChild:'count',
        equalTo: address.count
      }
    });


    let confirm = this.alertCtrl.create({
      title: 'Delete this Address',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.cartService.removeOrder(this.authService.getLoggedUID(),address.$key);
            commentList.subscribe(snapshots=>{
              snapshots.forEach(snapshot => {
                snapshot.ref.remove();
              });
          
          });
            
          }
        }
      ]
    });
    confirm.present();
  }

  continue()
  { 
    this.navCtrl.setRoot(ProductsPage);
  }

}
