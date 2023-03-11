import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  currentSport: any;

  foods = [
    {
      id: 1,
      sport: 'Badminton',
    },
    {
      id: 2,
      sport: 'Cricket',
    },
    {
      id: 3,
      sport: 'Football',
    },
    {
      id: 4,
      sport: 'Handball'
    },
    {
      id: 5,
      sport: 'Basketball'
    }
    
  ];

  constructor() { }

  ngOnInit() {
  }

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentSport = ev.target.value;
  }

}
