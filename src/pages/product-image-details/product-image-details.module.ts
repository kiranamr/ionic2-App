import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductImageDetailsPage } from './product-image-details';

@NgModule({
  declarations: [
    ProductImageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductImageDetailsPage),
  ],
})
export class ProductImageDetailsPageModule {}
