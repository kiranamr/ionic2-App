import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseListObservable,AngularFireDatabase } from "angularfire2/database";
import { Category } from '../../models/category';


/**
 * Generated class for the CategoryInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-info',
  templateUrl: 'category-info.html',
})
export class CategoryInfoPage {
  categoryListRef$: FirebaseListObservable<Category[]>;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private afDatabase:AngularFireDatabase,
    public menu: MenuController) {
      menu.enable(true);
    var userId = firebase.auth().currentUser.uid;
    this.categoryListRef$=this.afDatabase.list('category');
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
    
    console.log(this.categoryListRef$);
   
    }
  
    
  

}
