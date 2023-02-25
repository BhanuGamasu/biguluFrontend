import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  activityData: any = [];
  constructor(private route: Router, private authService: AuthServiceService) {
    // setInterval(() => {
    //   this.activityData = localStorage.getItem('activity');
    // this.activityData = JSON.parse(this.activityData);
    // console.log(this.activityData, 'dfghgfd');
    
    // }, 1000)
  }
  ngOninit(){
    // this.activityData = localStorage.getItem('activity');
    // this.activityData = JSON.parse(this.activityData);
    console.log('hiiiiiiiiiiii');
    this.authService.getAllActivities().subscribe(val => {
      if (val.success) {
        // this.activityData = val.data[0]? val.data: [];
      }
    })
    // setInterval(() => {
    //   this.activityData = localStorage.getItem('activity');
    // this.activityData = JSON.parse(this.activityData);    
    // }, 1000)
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter triggered');
    
    this.authService.getAllActivities().subscribe(val => {
      if (val.success) {
        this.activityData = val.data || [];
      }
    })
  }

  async signOut() {
    GoogleAuth.signOut().then(res => {
      console.log(res, 'Signed out');
      this.route.navigateByUrl('/login')
    })
  }

  search(){
    this.route.navigateByUrl('search')
  }
}
