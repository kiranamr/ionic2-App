import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatingProductPage } from './updating-product';

@NgModule({
  declarations: [
    UpdatingProductPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatingProductPage),
  ],
})
export class UpdatingProductPageModule {}
