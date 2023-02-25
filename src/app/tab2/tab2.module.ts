import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    // Geolocation,
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
