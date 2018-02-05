import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatogoiesPage } from './catogoies';

@NgModule({
  declarations: [
    CatogoiesPage,
  ],
  imports: [
    IonicPageModule.forChild(CatogoiesPage),
  ],
})
export class CatogoiesPageModule {}
