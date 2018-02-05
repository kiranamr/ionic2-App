import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailsForAdminPage } from './order-details-for-admin';

@NgModule({
  declarations: [
    OrderDetailsForAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailsForAdminPage),
  ],
})
export class OrderDetailsForAdminPageModule {}
