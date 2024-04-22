import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-condetions',
  templateUrl: './terms-and-condetions.page.html',
  styleUrls: ['./terms-and-condetions.page.scss'],
})
export class TermsAndCondetionsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeTab() {
    this.router.navigateByUrl('/tabs/tab1')
  }

}
