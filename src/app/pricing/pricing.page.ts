import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
})
export class PricingPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeTab() {
    this.router.navigateByUrl('/tabs/tab1')
  }

}
