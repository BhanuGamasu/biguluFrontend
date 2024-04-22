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

  constructor(private router: Router, private authService: AuthServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/tabs/tab1']);
    }
  }



  signIn() {
    GoogleAuth.signIn().then((res: any) => {
      // this.authService.login(res).subscribe(val => {
      //   if (val.success) {
      //     this.router.navigateByUrl('/tabs/tab1')
      //   }
      // }, err => {
      //   console.log(err);
      // })
      this.authService.checkUser(res).subscribe(val => {
        // res.userType = val.data;
        if (val.success) {
          localStorage.setItem('user', JSON.stringify(val.data.data));
          // let previousRoute = localStorage.getItem('previousPath');
          localStorage.setItem('token', val.data.Jwttoken);
          if (val.data.data.newUser) {
            this.router.navigate(['/user-details'])
            // } else if (previousRoute) {
            // localStorage.setItem('token', val.data);
            // this.router.navigate([previousRoute])
          } else {
            this.router.navigateByUrl('/tabs/tab1')
          }
        }
      }, err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err, 'signIn failed');
    });
  }

  navigateToTermsAndCond() {
    this.router.navigateByUrl('/terms-and-condetions')
  }

  navigateToRefund() {
    this.router.navigateByUrl('/cancellation-policy')
  }

  navigateToPrivacyPolicy() {
    this.router.navigateByUrl('/privacy-policy')
  }

  navigateToAboutUs() {
    this.router.navigateByUrl('/about-us')
  }

  navigateToPricing() {
    this.router.navigateByUrl('/pricing')
  }

  navigateToContactUs() {
    this.router.navigateByUrl('/contact-us')
  }

  toggleIcons() {
    const iconItems = document.querySelectorAll('.icon-item');

    // Toggle the "open" class for the icon items
    iconItems.forEach(item => item.classList.toggle('open'));
  }


}
