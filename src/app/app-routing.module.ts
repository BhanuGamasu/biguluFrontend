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
    path: 'activity-overview',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./activity-overview/activity-overview.module').then( m => m.ActivityOverviewPageModule)
  },
  {
    path: 'user-details',
    canActivate:[AuthGuardService],
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'profile-overview',
    loadChildren: () => import('./profile-overview/profile-overview.module').then( m => m.ProfileOverviewPageModule)
  },
  {
    path: 'activity-request-overview',
    loadChildren: () => import('./activity-request-overview/activity-request-overview.module').then( m => m.ActivityRequestOverviewPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
