import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndCondetionsPageRoutingModule } from './terms-and-condetions-routing.module';

import { TermsAndCondetionsPage } from './terms-and-condetions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsAndCondetionsPageRoutingModule
  ],
  declarations: [TermsAndCondetionsPage]
})
export class TermsAndCondetionsPageModule {}
