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
      localStorage.setItem('user', JSON.stringify(res));
      this.authService.login(res).subscribe(val => {
        if (val.success) {
          this.router.navigateByUrl('/tabs/tab1')
        }
      })
    }).catch(err => {
      console.log(err, 'signIn failed');
    });
  }

}
