import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private router: Router, private authService: AuthServiceService) { }

  ngOnInit() {
    console.log('login init');
  }

  ionViewWillEnter() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/tabs/tab1']);
    }
    console.log('ionViewWillEnter login');
    
  }

  

  signIn() {
    GoogleAuth.signIn().then(res => {
      console.log(res, 'signed in');
      // this.authService.login(res).subscribe(val => {
      //   if (val.success) {
      //     this.router.navigateByUrl('/tabs/tab1')
      //   }
      // }, err => {
      //   console.log(err);
      // })
      this.authService.checkUser(res).subscribe(val => {
        localStorage.setItem('user', JSON.stringify(res));
        if (val.data == 'new') {
          console.log(val, 'hiii');
          this.router.navigate(['/user-details'])
        } else {
          localStorage.setItem('token', val.data);
          this.router.navigateByUrl('/tabs/tab1')
        }
      }, err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err, 'signIn failed');
    });
  }

}
