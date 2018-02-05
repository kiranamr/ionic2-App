import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProductsPage } from './edit-products';

@NgModule({
  declarations: [
    EditProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProductsPage),
  ],
})
export class EditProductsPageModule {}
