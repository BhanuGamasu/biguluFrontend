import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityOverviewPageRoutingModule } from './activity-overview-routing.module';

import { ActivityOverviewPage } from './activity-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityOverviewPageRoutingModule
  ],
  declarations: [ActivityOverviewPage]
})
export class ActivityOverviewPageModule {}
