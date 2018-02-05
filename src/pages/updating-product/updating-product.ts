import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Product } from '../../models/product';
import firebase from 'firebase';
import { SharedService } from '../../providers/shared.service';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the UpdatingProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updating-product',
  templateUrl: 'updating-product.html',
  providers: [SharedService]
})
export class UpdatingProductPage {
  productList: FirebaseListObservable<any>;
  public myPhotosRef: any;  
  public myPhoto: any;
  public myPhotoURL: any;
  file: File;
  products={};

productRef$:FirebaseListObservable<any>;
product={id:'',image:'',name:'',discription:'',price:'',stock:'',category:'',available:''} ;

  constructor(public navCtrl: NavController,public af: AngularFireDatabase,public loadingCtrl: LoadingController, public params: NavParams,public sharedService: SharedService) {
   
   this.productRef$=af.list('/products');
    this.product.id=this.params.get('key');
    this.product.image = this.params.get('image');
  this.product.name = this.params.get('name');
  this.product.discription = this.params.get('discription');
  this.product.price = this.params.get('price');
  this.product.stock = this.params.get('stock');
  this.product.category = this.params.get('category');
  this.product.available = this.params.get('available');
  this.product.image; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatingProductPage');
  }
  goBack() {
    this.navCtrl.pop();
  }
  back() {
    this.navCtrl.pop();
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
  updateProduct(id,category,name,discription,price,image,stock,available){
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
      
     // this.products={name:this.product.name,discription:this.product.discription,price:this.product.price,stock:this.product.stock,image:this.myPhotoURL,category:this.product.category,available:this.product.available};
      console.log(this.products);
      /*this.af.object('/products/' + product.$key)
    .update(this.products);*/
  
  this.productRef$.update(this.product.id,
  {
    name:this.product.name,discription:this.product.discription,price:this.product.price,stock:this.product.stock,image:this.product.image,category:this.product.category,available:this.product.available
  }).then(uProduct=>{this.navCtrl.setRoot(DashboardPage);},error=>{console.log(error)});
  

   
   this.sharedService.showToast("The product is succesfully updated.")
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
