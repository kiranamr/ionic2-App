import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, ToastController, AlertController } from 'ionic-angular';

import { IntroSlidesPage } from '../pages/intro-slides/intro-slides';

import { LoginPage } from '../pages/login/login';
import {LogoutPage} from  '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';

import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { OrdersPage } from '../pages/orders/orders';
import { BillingPage } from '../pages/billing/billing';



import { SplashScreen } from '@ionic-native/splash-screen';

import { SharedService } from '../providers/shared.service';
import { CatogoiesPage } from '../pages/catogoies/catogoies';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CategoryInfoPage } from '../pages/category-info/category-info';
import { ProfilePage } from '../pages/profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth.service';
import { ProductPage } from '../pages/product/product';
import { AdminOrderViewPage } from '../pages/admin-order-view/admin-order-view';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  templateUrl: 'app.html',
  providers: [SharedService,AuthService],
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{title: string, component: any}>;
  pagesAdmin:Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private afAuth: AngularFireAuth,public authService: AuthService,
    public splashScreen: SplashScreen,
    public statusBar:StatusBar,
    public alertCtrl:AlertController
  ) {
    this.initializeApp();
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
     
          this.statusBar.overlaysWebView(false);
          this.statusBar.backgroundColorByHexString('#004D40');
     
          this.splashScreen.hide();
    });

// set status bar to white

    // set our app's pages
    this.pages = [
      { title: 'Products', component: ProductsPage },
      { title: 'Orders', component: OrdersPage },
      { title: 'Logout',component:LogoutPage}
    ];
    this.pagesAdmin = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Add product', component: ProductPage },
      { title: 'Add category', component: CatogoiesPage },
     // { title: 'Category information', component: CategoryInfoPage },
      {title:'User orders',component:AdminOrderViewPage},
      { title: 'Logout',component:LogoutPage}
    ];
  }
  addproduct(){
    this.nav.setRoot(ProductPage);  
  }
  profile(){
    this.nav.setRoot(ProfilePage);  
  }
  categoryinfo(){
    this.nav.setRoot(CategoryInfoPage);  
  }
  dashboard(){
    this.nav.setRoot(DashboardPage);  
  }
  category(){
    this.nav.setRoot(CatogoiesPage);  
  }
  LogOutfunction() {
    this.authService.logout();
    this.nav.setRoot(LoginPage);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
      this.splashScreen.hide();
     
      
    
    });
  }
 
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
   
  }
}
