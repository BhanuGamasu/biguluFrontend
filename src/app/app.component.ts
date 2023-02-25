import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  customers = [
    {
      name: 'Bhanu',
      age: 24,
      role: 'junior developer'
    },
    {
      name: 'Raam',
      age: 25,
      role: 'senior developer'
    },
    {
      name: 'Bheem',
      age: 26,
      role: 'junior Analyst'
    },
    {
      name: 'Bheem',
      age: 26,
      role: 'junior Analyst'
    }];
  constructor( private router: Router, private auth: AuthServiceService) {
    if (!this.auth.checkToken()){
      this.auth.logout()
    }
    if (!isPlatform('capacitor')) {
      this.initialize()
      // let init = await GoogleAuth.initialize();
      
      // setTimeout(() => {
      //   GoogleAuth.refresh().then(res => {
      //     console.log(res, 'logged user');
      //     this.router.navigate(['/tabs/tab1']);
      //   }).catch(err => {
      //     console.log(err, 'not logged in');
      //     this.router.navigate(['/login'])
      //   })
      // }, 1000)
    }
  }

  async initialize() {
    let init = await GoogleAuth.initialize();
    console.log(init, 'init');
  }
}
