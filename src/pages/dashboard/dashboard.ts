import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseListObservable,AngularFireDatabase } from "angularfire2/database";
import { Product } from '../../models/product';
import { CartService } from '../../providers/cart.service';
import { AuthService } from '../../providers/auth.service';
import { EditProductsPage } from '../edit-products/edit-products';
import { UpdatingProductPage } from '../updating-product/updating-product';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [CartService,AuthService]
})
export class DashboardPage {
 productListRef$: FirebaseListObservable<Product[]>;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,private afDatabase:AngularFireDatabase,
    public menu: MenuController,public cartService: CartService) {
      menu.enable(true);
    var userId = firebase.auth().currentUser.uid;
    this.productListRef$=this.afDatabase.list('products/');
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
showDetails(item)  : void  {
  this.navCtrl.push(EditProductsPage,item);
}
editProduct(id,category,name,discription,price,image,stock,available){
  
  this.navCtrl.push(UpdatingProductPage,{key:id,
                                          name:name,
                                          category:category,
                                          image:image,
                                          discription:discription,
                                          price:price,
                                          stock:stock,
                                          available:available
                                               });
 
}
deleteProducts(item:any) : void{

  const commentList = this.afDatabase.list('products/');
    


  let confirm = this.alertCtrl.create({
    title: 'Delete this product',
    buttons: [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        handler: () => {
          this.cartService.removeProducts(item.$key);
         
          
        }
      }
    ]
  });
  confirm.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    console.log(this.productListRef$);
  }

}
