import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AuthServiceService } from '../services/auth-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page { 
  activityData: any = [];
  searchObs: any;
  sData: any = '';
  constructor(private route: Router, private authService: AuthServiceService, private nav: NavController) {
    this.ionViewWillEnter()
    // setInterval(() => {
    //   this.activityData = localStorage.getItem('activity');
    // this.activityData = JSON.parse(this.activityData);
    // console.log(this.activityData, 'dfghgfd');
    
    // }, 1000)
  }
  // ngOninit(){
  //   // this.activityData = localStorage.getItem('activity');
  //   // this.activityData = JSON.parse(this.activityData);
  //   console.log('hiiiiiiiiiiii');
  //   // this.authService.getAllActivities().subscribe(val => {
  //   //   if (val.success) {
  //   //     // this.activityData = val.data[0]? val.data: [];
  //   //   }
  //   // })
  //   // setInterval(() => {
  //   //   this.activityData = localStorage.getItem('activity');
  //   // this.activityData = JSON.parse(this.activityData);    
  //   // }, 1000)
  //   this.ionViewWillEnter()
  // }
  ionViewWillEnter() {
    console.log('ionViewWillEnter triggered');
    this.searchObs?.unsubscribe();
    this.searchObs = this.authService.searchVal.subscribe(val => {
      console.log(val, 6474);
      this.sData = val;
      this.authService.getFilterData(this.sData).subscribe(res => {
        console.log(res, 6875);
        this.sData = ''
      })
      
    });
    if (this.sData == '') {
      this.authService.getAllActivities().subscribe(val => {
        if (val.success) {
          this.activityData = val.data || [];
        }
      })
    }  
  }

  search(){
    this.route.navigate(['search'])
  }

  activityOverview(id: any){
    this.route.navigateByUrl('activity-overview/'+ id)
  }

  userDetails(){
    this.route.navigateByUrl('user-details')
  }

  navigateRequests(){
    this.route.navigateByUrl('activity-request-overview')
  }
}
