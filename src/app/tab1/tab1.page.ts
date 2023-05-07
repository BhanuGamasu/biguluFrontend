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
  currentData:any  = {activity: '', date: '', time: '', gender:'', age: '', count: '', category: '', location: ''};
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
    this.currentData.date = ''
    console.log('ionViewWillEnter triggered');
    this.searchObs?.unsubscribe();
    this.searchObs = this.authService.searchVal.subscribe(val => {
      console.log(val, 6474);
      this.sData = val;
      this.authService.getFilterData(this.sData).subscribe(res => {
        console.log(res, 6875);
        this.sData = ''
        this.activityData = res.data;
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

  filterDate(val: any) {
    if (this.currentData.date == val) {
      return;
    }
    this.currentData.date = val;
    this.authService.getFilterData(this.currentData).subscribe(res => {
      console.log(res, 6875);
      this.sData = ''
      this.activityData = res.data;
    })
  }

  getLastSeen(visData: any) {
    if (visData?.lastSeen) {
      let diff = new Date().getDate() - new Date(visData.lastSeen).getDate();
      if (diff > 0) {
        return "seen " + diff + " day back";
      } else {
        return "seen today";
      }
    }else {
      return "not seen yet"
    }
  }

  search(){
    this.route.navigate(['search'])
  }

  activityOverview(id: any){
    this.route.navigateByUrl('activity-overview/'+ id)
  }

  navigateRequests(){
    this.route.navigateByUrl('activity-request-overview')
  }
}
