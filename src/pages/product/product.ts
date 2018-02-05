import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';

//import {  FilePath, File } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { SharedService } from '../../providers/shared.service';
import { DashboardPage } from '../dashboard/dashboard';


/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  providers: [SharedService]
  
})
export class ProductPage {
 
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  file: File;
  image:any;
  products={};
product={} as Product;
productRef$:FirebaseListObservable<Product[]>;
categoryRef$:FirebaseListObservable<Category[]>;

  constructor(public zone:NgZone, private alertCtrl: AlertController,public loadingCtrl: LoadingController,public sharedService: SharedService,private afDatabase:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController) {
      menu.enable(true);
    var userId = firebase.auth().currentUser.uid;
    this.productRef$=this.afDatabase.list('products/');
    this.categoryRef$=this.afDatabase.list('category');
    
   this.product.image;
  }
  captureDataUrl: string;
  
  changeListener($event) : void {
    this.file = $event.target.files[0];
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    const filename = this.product.name+Math.floor(Date.now() / 1000);
    let fileRef = firebase.storage().ref('photos/' +filename + ".jpg");
    fileRef.put(this.file).then((savedPicture) => {

      this.sharedService.showToast("Uploaded image success")
      this.product.image=savedPicture.downloadURL;
      this.myPhotoURL = savedPicture.downloadURL;
    });
    
  }
 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
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


  addProduct(product:Product)
  {
    
     if(this.product.category==''||this.product.category==null)
    {
      this.sharedService.showToast("Please enter the product category field!");
    }
    else if(this.product.name==null||this.product.name=='')
    {
      this.sharedService.showToast("Please enter the name field!");
    }
    else if(this.product.image==null||this.product.image=='')
    {
      this.sharedService.showToast("Please enter the image field!");
    }
    
    else if(this.product.discription==''||this.product.discription==null)
    {
      this.sharedService.showToast("Please enter the product description field!");
    }
    else if(this.product.price==null)
    {
      this.sharedService.showToast("Please enter the product price field!");
    }
    else if(this.product.stock==null)
    {
      this.sharedService.showToast("Please enter the product stock field!");
    }
  else if(this.product.available==null)
        {
      this.sharedService.showToast("Please enter the product available field!");
    }
   
    else{

      //this.products={name:this.product.name,discription:this.product.discription,price:this.product.price,stock:this.product.stock,image:this.myPhotoURL,category:this.product.category,available:this.product.available};
      console.log(this.products);
      this.productRef$.push(this.product).then(uProduct=>{this.navCtrl.setRoot(DashboardPage);},error=>{console.log(error)})
   console.log(product);
   
   this.sharedService.showToast("The new product is succesfully added.")
   this.product.name='';
   this.product.price=null;
   this.product.stock=null;
   this.product.image='';
   
   this.product.discription='';
   this.product.category='';
   this.product.available=null;
    }
    
    
    
    
  }

}
