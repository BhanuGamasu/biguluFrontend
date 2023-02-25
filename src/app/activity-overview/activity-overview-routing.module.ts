import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityOverviewPage } from './activity-overview.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityOverviewPageRoutingModule {}
