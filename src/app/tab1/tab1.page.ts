import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  activityData: any = [];
  constructor(private route: Router) {
    setInterval(() => {
      this.activityData = localStorage.getItem('activity');
    this.activityData = JSON.parse(this.activityData);
    // console.log(this.activityData, 'dfghgfd');
    
    }, 1000)
  }
  ngOninit(){
    this.activityData = localStorage.getItem('activity');
    this.activityData = JSON.parse(this.activityData);
    console.log('hiiiiiiiiiiii');
    
    setInterval(() => {
      this.activityData = localStorage.getItem('activity');
    this.activityData = JSON.parse(this.activityData);    
    }, 1000)
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

  activityOverview(){
    this.route.navigateByUrl('activity-overview')
  }
}
