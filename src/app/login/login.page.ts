import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    GoogleAuth.signIn().then(res => {
      console.log(res, 'signed in');
      this.router.navigateByUrl('/tabs/tab1')
    }).catch(err => {
      console.log(err, 'signIn failed');
    });
  }

}
