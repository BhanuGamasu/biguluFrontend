import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityRequestOverviewPageRoutingModule } from './activity-request-overview-routing.module';

import { ActivityRequestOverviewPage } from './activity-request-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityRequestOverviewPageRoutingModule
  ],
  declarations: [ActivityRequestOverviewPage]
})
export class ActivityRequestOverviewPageModule {}
