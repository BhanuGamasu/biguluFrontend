import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'search',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'activity-overview/:id',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./activity-overview/activity-overview.module').then( m => m.ActivityOverviewPageModule)
  },
  {
    path: 'user-details',
    // canActivate:[AuthGuardService],
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'profile-overview/:id',
    loadChildren: () => import('./profile-overview/profile-overview.module').then( m => m.ProfileOverviewPageModule)
  },
  {
    path: 'profile-overview/:id/:id',
    loadChildren: () => import('./profile-overview/profile-overview.module').then( m => m.ProfileOverviewPageModule)
  },
  {
    path: 'invites/:id',
    loadChildren: () => import('./activity-request-overview/activity-request-overview.module').then( m => m.ActivityRequestOverviewPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'terms-and-condetions',
    loadChildren: () => import('./terms-and-condetions/terms-and-condetions.module').then( m => m.TermsAndCondetionsPageModule)
  },
  {
    path: 'cancellation-policy',
    loadChildren: () => import('./cancellation-policy/cancellation-policy.module').then( m => m.CancellationPolicyPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'pricing',
    loadChildren: () => import('./pricing/pricing.module').then( m => m.PricingPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'editActivity/:id',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  // {
  //   path: 'common-popup',
  //   loadChildren: () => import('./common-popup/common-popup.module').then( m => m.CommonPopupPageModule)
  // }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
