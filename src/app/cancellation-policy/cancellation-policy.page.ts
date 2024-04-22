import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.page.html',
  styleUrls: ['./cancellation-policy.page.scss'],
})
export class CancellationPolicyPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeTab() {
    this.router.navigateByUrl('/tabs/tab1')
  }

}
