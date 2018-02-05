import {Injectable} from '@angular/core';
import { LoadingController, AlertController  } from 'ionic-angular';

@Injectable()
export class SharedService {

  loader : any;
  constructor(public loadingCtrl: LoadingController,
              public toastCtrl: AlertController
        ) {

    this.loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000
      });
     
  }

  showLoading() : void {
    this.loader.present();
  }

  hideLoading() : void {
    this.loader.dismiss();
  }

  showToast(msg : string) : void {
    let toast = this.toastCtrl.create({
        message: msg,
        
      
      });
    toast.present();
    setTimeout(() => {
      toast.dismiss();
      console.log("called dismiss");
    }, 1000);
  }
  
}