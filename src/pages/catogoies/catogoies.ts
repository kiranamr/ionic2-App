import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';

import firebase from 'firebase';
import {Category } from '../../models/category';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { DashboardPage } from '../dashboard/dashboard';
import { SharedService } from '../../providers/shared.service';


/**
 * Generated class for the CatogoiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catogoies',
  templateUrl: 'catogoies.html',
  providers: [SharedService]
})
export class CatogoiesPage {
  category ={} as Category;
   categoryRef$:FirebaseListObservable<Category[]>
   categoryListRef$: FirebaseListObservable<Category[]>;
   public categoryRef:firebase.database.Reference;
  constructor(private afDatabase:AngularFireDatabase,public sharedService: SharedService,public navCtrl: NavController, public navParams: NavParams, public view: ViewController,
    public menu: MenuController) {
      menu.enable(true);
       var userId = firebase.auth().currentUser.uid;
    this.categoryRef$=this.afDatabase.list('category');
    this.categoryRef = firebase.database().ref('category');
    this.categoryListRef$=this.afDatabase.list('category');
    
    console.log(this.categoryRef$);
  
  
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
    console.log('ionViewDidLoad CatogoiesPage');
    console.log(this.categoryListRef$);
  }
  addCategory(category:Category)
  {
    if(this.category.categoryName==null||this.category.categoryName=='')
    {
      this.sharedService.showToast("Please enter the field!")
    }
    else{   
      this.categoryRef.orderByChild("categoryName").equalTo(this.category.categoryName).once("value",snapshot => {
        const userData = snapshot.val();
        if (userData){
          this.sharedService.showToast("Category already exist.")
          console.log(userData);
        }
        else{
          var theDataToAdd = this.category.categoryName;
         // var usersRef = this.afDatabase.list('category');
      
      
           
           this.categoryRef.push({categoryName:theDataToAdd});
            console.log(category);
            this.category.categoryName='';
            this.sharedService.showToast("New category added.")
            
            theDataToAdd='';
    
  
    


        }
    });


  
      

    }
         

        }
    
     
     

      
     
    

    
    
    
  
  close(){
    this.navCtrl.setRoot(DashboardPage);  
  }
    
   

}
