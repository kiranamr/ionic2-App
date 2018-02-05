import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { CatogoiesPage } from '../catogoies/catogoies';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   profile= {} as Profile 
  constructor(private afDatabase:AngularFireDatabase,private afauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  createProfile()
  {
  this.afauth.authState.take(1).subscribe(auth =>{
    this.afDatabase.object('userProfile/'+auth.uid+'/profile/').set(this.profile).then(()=>this.navCtrl.setRoot(CatogoiesPage))
  })
  }
  signOut() {
    this.afauth.auth.signOut();
  }
}
