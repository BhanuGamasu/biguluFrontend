import { Location } from '@angular/common';
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

  constructor(private route: Router, private auth: AuthServiceService, private location: Location) { }

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

  getSentence() {
    let a = this.activityData?.isVisitor ? this.activityData?.userActions?.joined ? 'I want to cancel my invite': 'JOIN NOW' : 'Cancel Activity'
    // if (activityData?.userActions?.isVisitor) {
      return a
    // }
  }

  updateData(key: any, value: any) {
    console.log(key, value);
    if (this.activityData?.isVisitor) {
      this.auth.updateVisData({key, value, activityId: this.id}).subscribe(val => {
        console.log(val);
        this.activityData = val.data[0];
        
      }, err => {
        console.log(err);
        
      })
    } else {
      this.auth.deleteActivity({id: this.id}).subscribe(val => {
        if (val.success) {
          this.route.navigate(['/tabs/tab1']);
        }
      }, err => {
        console.log(err);
        
      })
    }
  }

  closeTab() {
    this.location.back()
    // this.route.navigateByUrl('/tabs/tab1')
  }

  getProfileOverview(){
    this.route.navigateByUrl('profile-overview/' + this.activityData?.activityCreatedBy?._id)
  }

  invitesView() {
    this.route.navigate(['/invites/' + this.id])
  }

}
