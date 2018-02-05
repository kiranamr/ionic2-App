import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class CustomerService {

  deliveryAddresses : FirebaseListObservable<any>;
  deliveryProducts:FirebaseListObservable<any>
  constructor(public db: AngularFireDatabase) {}
  
  loadDeliveyAddress(userid : string)  {
     this.deliveryAddresses = this.db.list(`customer/${userid}/address`);
     this.deliveryProducts = this.db.list(`products/`);
  };

  addAddress(userid : string, address : any){
   
    this.loadDeliveyAddress(userid);
    this.deliveryAddresses.push(address);

  };

  removeAddress(userid : string, addressId : string){
    this.loadDeliveyAddress(userid);
    this.deliveryAddresses.remove(addressId).then(_ => console.log('item removed!'));
  };

  updateAddress(userid : string, address : any , addressKey : string ){

    this.db.object(`customer/${userid}/address/${addressKey}`, {preserveSnapshot:true} ).first().subscribe(data => {
      if(data.val() !== null) { 
          this.deliveryAddresses.update(addressKey , address);
      }else{
          console.log('No such element');
      } 
    });
  };
  
  updateProducts1(userid : string, address : any , addressKey : string ){

    this.db.object(`products/${addressKey}`, {preserveSnapshot:true} ).first().subscribe(data => {
      if(data.val() !== null) { 
          this.deliveryProducts.update(addressKey , address);
      }else{
          console.log('No such element');
      } 
    });
  };
}