import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ViewController, MenuController, Platform  } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import {CartPage} from '../cart/cart';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/filter';
import firebase from 'firebase';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  providers: [CartService,AuthService]
})
export class ProductsPage {
  public productsList:Array<any>;
  public loadedproductsList:Array<any>;
public productsRef:firebase.database.Reference;
  products: FirebaseListObservable<any[]>;
  categoryRef$:FirebaseListObservable<Category[]>
  productListRef$:Observable<Product[]>;
  filteredItems: Array<Product>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase,
              private viewCtrl: ViewController,
              afAuth: AngularFireAuth,
              public cartService: CartService,
              public authService: AuthService,
              public menu: MenuController,
              public statusBar:StatusBar,
              public platform:Platform,
              public alertCtrl:AlertController,
              public splashScreen:SplashScreen
            ) {
              
          this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
           
           
              this.statusBar.overlaysWebView(false);
              this.statusBar.backgroundColorByHexString('#004D40');
             this.splashScreen.hide();
          });
              menu.enable(true);
    this.products = db.list('products',{preserveSnapshot:true});
    this.categoryRef$=this.db.list('category');
    cartService.loadCartList(this.authService.getLoggedUID());
    this.productsRef = firebase.database().ref('/products');
    this.productListRef$=this.db.list('products/');
    this.productsRef.on('value', productsList => {
      let countries = [];
      productsList.forEach( country => {
        countries.push(country.val());
        return false;
      });
    });
    this.products.subscribe(productsList => {
      let productsdata = [];
      productsList.forEach( product => {
        productsdata.push(product.val());
        return false;
      });
      
      
      this.productsList = productsdata;
      this.loadedproductsList = productsdata;
    });

    this.initializeItems();
  }
  initializeItems() {
   this.products =this.db.list('products');
   this.productListRef$=this.db.list('products/');
    this.productsList = this.loadedproductsList;
   
  //this.countryList=this.products;
  
  }
  myHandlerFunction(){
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want exit app',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.platform.exitApp();
           
            
          }
        }
      ]
    });
    confirm.present();
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
  ionViewDidLoad() {
  }

  showDetails(product)  : void  {
    this.navCtrl.push(ProductDetailsPage,product);
  }

  addToCart(product)  : void  {
    console.log("product page"+product);
    this.cartService.addCartItem(this.authService.getLoggedUID(), product);
  }
  getItems(ev:any) {
    // Reset items back to all of the items
    console.log(ev);
    let val = ev.target.value;
    this.initializeItems();
   if(val && val.trim() != '')
   {
    this.productListRef$ = this.productListRef$.map((item)=>{
      if(item &&item.length>0){
        item = item.filter(brand=>{
         
         return (brand.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        });
      }    
      return item;   
   })
  
   }
      
   
      }
  
    

  openCart() : void {
    this.navCtrl.push(CartPage);
  }


  
  

  selectCategory(ev:any) : void{
    console.log(ev.categoryName);
    console.log(ev);
    let val = ev.categoryName;
    console.log(val);
    this.initializeItems();
   if(val && val.trim() != '')
   {
    this.productListRef$ = this.productListRef$.map((item)=>{
      if(item &&item.length>0){
        
         
         return   item.filter(item =>val === 'all'|| item.category === val);
        };
      });    
       
  
  
   }
  }


}
