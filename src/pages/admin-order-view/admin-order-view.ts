import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { CartService } from '../../providers/cart.service';
import { AuthService } from '../../providers/auth.service';
import 'rxjs/add/operator/map'
import firebase from 'firebase';
import { global } from '@angular/core/src/util';
import { Observable } from 'rxjs/Observable';
import { EditProductsPage } from '../edit-products/edit-products';
import { OrderDetailsForAdminPage } from '../order-details-for-admin/order-details-for-admin';

/**
 * Generated class for the AdminOrderViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-order-view',
  templateUrl: 'admin-order-view.html',
  providers: [CartService,AuthService]
})
export class AdminOrderViewPage {
  public productsList:Array<any>;
  
  restaurants: any[] = [];
  allRestaurants: Observable<any[]>
  public loadedproductsList:Array<any>;
public productsRef:firebase.database.Reference;
  orders :Observable<any>
   countries = [];
   lists;
   database = firebase.database();
  OrdersRef$:FirebaseListObservable<any>;
   
  
  constructor(public navCtrl: NavController,public cartService: CartService,public authService: AuthService,
    public alertCtrl: AlertController, public navParams: NavParams,private afDatabase:AngularFireDatabase,public menu: MenuController)
     {
    menu.enable(true);
var userId="UMPGUeVqgmf40bqLV7W8pbXsrzU2";

    cartService.loadOrders(this.authService.getLoggedUID());
    //this.orders = this.cartService.orderItems;
    this.productsRef = firebase.database().ref('orders');
   


    
    this.OrdersRef$ = this.afDatabase.list('orderuserID');
    
  
 
   
      
    
   console.log(this.OrdersRef$);
  
}
showDetails(item)  : void  {
  this.navCtrl.push(OrderDetailsForAdminPage,item);
}
deleteOrder(address:any) : void{
  let confirm = this.alertCtrl.create({
    title: 'Delete this Address',
    buttons: [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        handler: () => {
          this.cartService.removeOrders(address.count,address.$key);
          
        }
      }
    ]
  });
  confirm.present();
}
getRestaurants() {
  let restaurants = this.afDatabase.list('/orders');
  return restaurants;
}

getResturantsFromKeys(key){
  let rest = this.afDatabase.list('/orders/'+ key);
  return rest;
}
openMenu(evt) {
  if(evt === "main"){
     this.menu.enable(true, 'menu2');
     this.menu.enable(false, 'menu1');
  }else{
     this.menu.enable(true, 'menu1');
     this.menu.enable(false, 'menu2');
  }
  this.menu.toggle();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminOrderViewPage');
    console.log(this.OrdersRef$);
    
  }

}
