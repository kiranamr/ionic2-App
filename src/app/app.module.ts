import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IntroSlidesPage } from '../pages/intro-slides/intro-slides';

import { LoginPage } from '../pages/login/login';
import {LogoutPage} from  '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';

import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { OrdersPage } from '../pages/orders/orders';


import { SplashScreen } from '@ionic-native/splash-screen';

import { BillingPage } from '../pages/billing/billing';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CategoryInfoPage } from '../pages/category-info/category-info';
import { ProfilePage } from '../pages/profile/profile';
import { CatogoiesPage } from '../pages/catogoies/catogoies';
import { ProductPage } from '../pages/product/product';
import { ZoomAreaModule } from 'ionic2-zoom-area';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminOrderViewPage } from '../pages/admin-order-view/admin-order-view';
import { ProductImageDetailsPage } from '../pages/product-image-details/product-image-details';
import { FooterPage } from '../pages/footer/footer';
import { HeaderPage } from '../pages/header/header';
import { EditProductsPage } from '../pages/edit-products/edit-products';
import { UpdatingProductPage } from '../pages/updating-product/updating-product';
import { OrderDetailsForAdminPage } from '../pages/order-details-for-admin/order-details-for-admin';
import { StatusBar } from '@ionic-native/status-bar';



@NgModule({
  declarations: [
    MyApp,
    IntroSlidesPage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    ProductsPage,
    ProductDetailsPage,
    CartPage,
    OrdersPage,
    BillingPage,
    LogoutPage,DashboardPage,
    CategoryInfoPage,
    ProfilePage,FooterPage,HeaderPage,
    CatogoiesPage,
    EditProductsPage,
    ProductPage,AdminOrderViewPage,ProductImageDetailsPage,
    UpdatingProductPage,
    OrderDetailsForAdminPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyBg0MiWvmoiAVSG9MtGni6YxVPprUY_nTo",
    authDomain: "shop-c9a6a.firebaseapp.com",
    databaseURL: "https://shop-c9a6a.firebaseio.com",
    projectId: "shop-c9a6a",
    storageBucket: "shop-c9a6a.appspot.com",
    messagingSenderId: "346257080233"
    }),                                       
    AngularFireDatabaseModule,                
    AngularFireAuthModule,
    ZoomAreaModule.forRoot(),
    BrowserAnimationsModule                     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,FooterPage,
    HeaderPage,EditProductsPage,
    AdminOrderViewPage,
    CategoryInfoPage,
    CatogoiesPage,
    ProfilePage,
    IntroSlidesPage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    ProductsPage,
    ProductDetailsPage,
    CartPage,
    UpdatingProductPage,
    ProductPage,
    OrdersPage,
    BillingPage,
    LogoutPage,DashboardPage,
    ProductImageDetailsPage,
    OrderDetailsForAdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
