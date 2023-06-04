import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-activity-request-overview',
  templateUrl: './activity-request-overview.page.html',
  styleUrls: ['./activity-request-overview.page.scss'],
})
export class ActivityRequestOverviewPage implements OnInit {
  id: string;
  inviteData: any;

  constructor(private route: Router, private auth: AuthServiceService, private location: Location) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.route.url.split('/')[2];
    this.auth.getInvitesData({activityId: this.id}).subscribe(val => {
      if (val.success) {
        this.inviteData = val.data[0]
        console.log(this.inviteData,"bhhh");
        
      }
    }, err => {

    })
  }

  goBack() {
    this.location.back()
    // this.route.navigateByUrl('/activity-overview/' + this.id)
  }

  navigate(visitorId: any) {
    this.route.navigateByUrl('profile-overview/' + visitorId + '/' + this.id)
  }

}
