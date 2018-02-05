import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { RegisterPage } from '../register/register';
import { ForgotPassPage } from '../forgot-pass/forgot-pass';

import {AuthService} from '../../providers/auth.service';
import {SharedService} from '../../providers/shared.service';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService,SharedService]
})
export class LoginPage {
  email : string; 
  password : string; 
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthService,
              public sharedService: SharedService
             ) {
        this.authService.logout();
  }

  ionViewDidLoad() {
    if(this.authService.isLoggedIn()){
      this.navCtrl.setRoot(ProductsPage);
    }
  }

  login(){
     // start loading
if(this.email==''||this.email==null)
{
  this.sharedService.showToast("Enter the email!")
}
else if(this.password==''||this.password==null)
{
  this.sharedService.showToast("Enter the password!")
}
else
{
  this.authService.login(this.email,this.password).then(value => {
    this.sharedService.hideLoading(); // stop loading
    if(this.email=='admin@gmail.com'&& this.password=='admin@810')
    {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
    
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
      this.navCtrl.setRoot(DashboardPage);
    }
    else{
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
    
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
      this.navCtrl.setRoot(ProductsPage);
    }
    
  },error =>{
    let msg;
    let err:any=error;
    switch (err.code) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY
      case "auth/wrong-password":
        msg= "Password is wrong.";
        break;

      case "auth/user-not-found":
        msg= 'User not found.'
        break;

      case "auth/invalid-email":
        msg= 'Email is wrong.';
        break;
    }

    this.sharedService.showToast(msg);})
  .catch(err => {
    this.sharedService.hideLoading();
    this.sharedService.showToast("Something went wrong!")
  });
}
    
  }
  createAccount(): void{
    this.navCtrl.push(RegisterPage);
  }

  resetPassword():void{
    this.navCtrl.push(ForgotPassPage);
  }

}
