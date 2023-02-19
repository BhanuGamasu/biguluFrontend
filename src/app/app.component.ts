import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  customers = [
    {
      name: 'Bhanu',
      age: 24,
      role: 'junior developer'
    },
    {
      name: 'Raam',
      age: 25,
      role: 'senior developer'
    },
    {
      name: 'Bheem',
      age: 26,
      role: 'junior Analyst'
    },
    {
      name: 'Bheem',
      age: 26,
      role: 'junior Analyst'
    }];
  constructor() {}
}
