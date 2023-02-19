import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  storageData = '';

  constructor(private route: Router) {}

  ngOnInit(){
    let storeData = localStorage.getItem('inputValue');
    this.storageData = storeData as string;
  }
}
