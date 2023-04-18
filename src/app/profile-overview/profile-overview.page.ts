import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.page.html',
  styleUrls: ['./profile-overview.page.scss'],
})
export class ProfileOverviewPage implements OnInit {
  id: string;
  userData: any;
  showBtn: boolean = false;
  activityId: string;
  acceptInfo: any = {};

  constructor(
    private location: Location,
    private route: Router, 
    private auth: AuthServiceService
    ) {
      this.id = this.route.url.split('/')[2];
      if (this.route.url.split('/').length == 4) {
        this.showBtn = true;
        this.activityId = this.route.url.split('/')[3]
      }
      console.log(this.id, this.route.url.split('/'));
      
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.auth.getProfile({id: this.id}).subscribe(val => {
      if (val.success) {
        this.userData = val.data
        this.auth.acceptInfo({visitorId: this.id, activityId: this.activityId}).subscribe(res => {
          if(res.success) {
            this.acceptInfo = res.data;
          }
        }, err => {
          console.log(err);
        })
      }
    }, err => {
      console.log(err);
    })
  }

  accept(val: boolean){
    this.auth.updateAcceptInfo({value: val, visitorId: this.id, activityId: this.activityId}).subscribe(val => {
      console.log(val, 646);
      if(val.success) {
        this.acceptInfo = val.data;
      }
    }, err => {
      console.log(err);
    })
  }

  back() {
    this.location.back()
  }

}
