import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.page.html',
  styleUrls: ['./activity-overview.page.scss'],
})
export class ActivityOverviewPage implements OnInit {
  id: string;
  activityData: any;

  constructor(private route: Router, private auth: AuthServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.route.url.split('/'));
    this.id = this.route.url.split('/')[2];
    this.auth.getAcivityInfo({activityId: this.id}).subscribe(val => {
      console.log(val.data[0]);
      this.activityData = val.data[0];
    }, err => {
      console.log(err, 8786);
      
    })
     this.route.url
  }

  updateData(key: any, value: any) {
    console.log(key, value);
    
    this.auth.updateVisData({key, value, activityId: this.id}).subscribe(val => {
      console.log(val);
      this.activityData = val.data[0];
      
    }, err => {
      console.log(err);
      
    })
  }

  getProfileOverview(){
    this.route.navigateByUrl('profile-overview')
  }

}
