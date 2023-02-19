import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputValue: string='';
  constructor(private route: Router) {}

  ngOninit(){
    this.publish()
  }

  publish(){
    localStorage.setItem('inputValue', this.inputValue);
    this.route.navigateByUrl('tabs/tab2')
  }

}
