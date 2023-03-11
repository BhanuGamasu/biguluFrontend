import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityRequestOverviewPage } from './activity-request-overview.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityRequestOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRequestOverviewPageRoutingModule {}
