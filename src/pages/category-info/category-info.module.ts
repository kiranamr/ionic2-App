import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryInfoPage } from './category-info';

@NgModule({
  declarations: [
    CategoryInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryInfoPage),
  ],
})
export class CategoryInfoPageModule {}
