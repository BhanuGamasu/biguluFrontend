import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputValue: string='';
  createActivity: FormGroup;
  activityData: any;
  lat: any;
  lng: any;
  city: any;
  town: any;
  dateNew: any;
  selectedTimeSpan: any;
  currentData:any  = {date: 'Today', startDate: '', endDate: '', time: 'Anytime', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
  startDate: Date;
  endDate: Date;
  // currentData:any  = {date: 'Today', time: 'Anytime', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
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
  constructor(private route: Router, private fb: FormBuilder, private alertController: AlertController, private authService: AuthServiceService) {}

  ngOninit(){
    // let data = this.authService.getLocation();
    // console.log(data, 'data');
    
    // this.publish()
    // this.createActivity = this.fb.group({
      // date: ['', Validators.required],
      // gender: ['', Validators.required],
      // age: ['', Validators.required],
      // location: ['Miyapur Hyderabad', Validators.required],
      // count: ['', Validators.required],
      // activityType: ['', Validators.required]
    // })
  }

  // getLocation() {
  //   this.geolocation.getCurrentPosition().then((resp:any) => {
  //     this.lat = resp.coords.latitude;
  //     this.lng = resp.coords.longitude;
  //     this.getCityTownName();
  //   }).catch((err:any) => {
  //     console.log('Error getting location', err);
  //   });
  // }

  // getCityTownName() {
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng}&key=AIzaSyDHD_UputIOSkl8aL6Q7zH30Yypkw-5lO4`;

    // this.http.get(url).subscribe((data: any) => {
    //   const address_components = data.results[0].address_components;

    //   for (const component of address_components) {
    //     if (component.types.indexOf('locality') > -1) {
    //       this.city = component.long_name;
    //     }
    //     if (component.types.indexOf('sublocality') > -1) {
    //       this.town = component.long_name;
    //     }
    //   }

    //   console.log('City:', this.city);
    //   console.log('Town:', this.town);
    // });
  // }

  publish(){
    // localStorage.setItem('inputValue', this.inputValue);
    // console.log('hiiii', this.createActivity.value, 9898);
    for (let key in this.currentData) {
      if (this.currentData[key] == '') {
        return;
      }
    }
    // this.activityData = localStorage.getItem('activity')
    this.authService.createActivity(this.currentData).subscribe(val => {
      if (val.success) {
        this.route.navigateByUrl('tabs/tab1')
      }
    })
    // this.activityData = JSON.parse(this.activityData);
    // console.log(this.currentData, this.activityData, 5678);
    // if (this.activityData == undefined) {
    //   this.activityData = []
    // }
    // this.activityData.push(this.currentData);
    // localStorage.setItem('activity', JSON.stringify(this.activityData));
    // this.route.navigateByUrl('tabs/tab1')
  }

  onClick(key: any, value: any) {
    console.log(key, value, this.currentData[key]);
    if (key == 'count' || key == 'description'){
      value = value.target.value;
    }
    this.currentData[key] = value;
  }
  async openCalendar() {
    const presentDate = new Date();
    const formattedPresentDate = presentDate.toISOString().split('T')[0];
  
    const alert = await this.alertController.create({
      header: 'Select Date and Time',
      inputs: [
        {
          name: 'date',
          type: 'date',
          min: formattedPresentDate,
        },
        {
          name: 'startTime',
          type: 'time',
          placeholder: 'Start Time',
          min: '03:00'
        },
        {
          name: 'endTime',
          type: 'time',
          placeholder: 'End Time',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: data => {
            const selectedDate = new Date(data.date);
            const startTime = data.startTime;
            const endTime = data.endTime;
            console.log(data, 878);
            this.startDate = selectedDate;
            this.startDate.setHours(data.startTime?.slice(0,2));
            this.startDate.setMinutes(data.startTime?.slice(3));
            // this.startDate.setSeconds(0);
            this.endDate = selectedDate

            this.endDate.setHours(data.endTime?.slice(0,2));
            this.endDate.setMinutes(data.endTime?.slice(3));
            console.log(selectedDate, this.startDate, this.endDate, 6876);
            
            this.currentData.startDate = this.startDate;
            this.currentData.endDate = this.endDate
            const startDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), startTime.split(':')[0], startTime.split(':')[1]);
            const endDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), endTime.split(':')[0], endTime.split(':')[1]);
            
            const formattedDate = startDateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedStartTime = startDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            const formattedEndTime = endDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            
            const formattedTimeSpan = `${formattedStartTime} - ${formattedEndTime}`;
            this.selectedTimeSpan = formattedTimeSpan;
            const formattedDateTimeSpan = `${formattedDate} ${formattedTimeSpan}`;
        
            // this.dateNew = selectedDate;
            // console.log(this.dateNew, selectedDate, formattedTimeSpan, 'dqdq');
            // selectedDate.setHours()
            // this.startDate = selectedDate
            this.currentData.date = selectedDate;
            this.currentData.timeSpan = formattedTimeSpan;
          },
        },
      ],
    });
  
    await alert.present();
  }

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentSport = ev.target.value;
  }
  

}
