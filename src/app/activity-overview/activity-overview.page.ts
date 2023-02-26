import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.page.html',
  styleUrls: ['./activity-overview.page.scss'],
})
export class ActivityOverviewPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }

  getProfileOverview(){
    this.route.navigateByUrl('profile-overview')
  }

}
