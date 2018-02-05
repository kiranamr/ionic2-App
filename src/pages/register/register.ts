import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { LoginPage } from '../login/login';

import {AuthService} from '../../providers/auth.service';
import {SharedService} from '../../providers/shared.service';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthService,SharedService]
})
export class RegisterPage {
  email : string; 
  password : string; 
  public userRef:firebase.database.Reference;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              public sharedService: SharedService
             ) {
      this.authService.logout();
      this.userRef = firebase.database().ref('userProfile');
  }

  ionViewDidLoad() {
    if(this.authService.isLoggedIn()){
      this.navCtrl.setRoot(ProductsPage);
    }
  }
  gotoSignIn(): void{
    this.navCtrl.push(LoginPage);
  }

  register(){
    
   if(this.email==''||this.email==null){
      this.sharedService.showToast("Enter the email!");
    }
    else if(this.password==''||this.password==null)
    {
      this.sharedService.showToast("Enter the password!");
    }
    else{
      this.userRef.orderByChild("email").equalTo(this.email).once("value",snapshot => {
        const userData = snapshot.val();
        if (userData){
          this.sharedService.showToast("Email already exist.")
          console.log(userData);
        }

        else{
      this.authService.signup(this.email,this.password).then(value => {
        firebase.database()
        .ref('userProfile')
        .push({ email:this.email,password:this.password });
        //this.sharedService.hideLoading();
        this.sharedService.showLoading();
        this.navCtrl.setRoot(LoginPage);
      })
      .catch(err => {
        this.sharedService.hideLoading();
        this.sharedService.showToast("Email already exist!")
      });
    
    }
    });
  
   
  


    }
}
}