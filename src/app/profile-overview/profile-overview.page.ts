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

  constructor(
    private location: Location,
    private route: Router, 
    private auth: AuthServiceService
    ) {
      this.id = this.route.url.split('/')[2];
      console.log(this.id, this.route.url.split('/'));
      
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.auth.getProfile({id: this.id}).subscribe(val => {
      if (val.success) {
        this.userData = val.data
      }
    })
  }

  back() {
    this.location.back()
  }

}
