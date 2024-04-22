import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsAndCondetionsPage } from './terms-and-condetions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsAndCondetionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsAndCondetionsPageRoutingModule {}
