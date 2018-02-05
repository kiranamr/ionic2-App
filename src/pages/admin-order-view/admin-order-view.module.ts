import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrderViewPage } from './admin-order-view';

@NgModule({
  declarations: [
    AdminOrderViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminOrderViewPage),
  ],
})
export class AdminOrderViewPageModule {}
