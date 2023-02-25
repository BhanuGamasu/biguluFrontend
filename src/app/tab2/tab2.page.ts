import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
// import { Geolocation } from '@ionic-native/geolocation/ngx';


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
  currentData:any  = {date: 'Today', time: 'Anytime', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
  constructor(
    // private geolocation: Geolocation, 
    // private http: HttpClient, 
    private route: Router, private fb: FormBuilder, private alertController: AlertController) {}

  ngOninit(){
    // this.getLocation();
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

  getCityTownName() {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng}&key=AIzaSyDHD_UputIOSkl8aL6Q7zH30Yypkw-5lO4`;

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
  }

  publish(){
    // localStorage.setItem('inputValue', this.inputValue);
    // console.log('hiiii', this.createActivity.value, 9898);
    for (let key in this.currentData) {
      if (this.currentData[key] == '') {
        return;
      }
    }
    this.activityData = localStorage.getItem('activity')
    this.activityData = JSON.parse(this.activityData);
    console.log(this.currentData, this.activityData, 5678);
    if (this.activityData == undefined) {
      this.activityData = []
    }
    this.activityData.push(this.currentData);
    localStorage.setItem('activity', JSON.stringify(this.activityData));
    this.route.navigateByUrl('tabs/tab1')
  }

  onClick(key: any, value: any) {
    console.log(key, value, this.currentData[key]);
    if (key == 'count' || key == 'description'){
      value = value.target.value;
    }
    this.currentData[key] = value;
  }
  async openCalendar() {
    const alert = await this.alertController.create({
      header: 'Select Date',
      inputs: [
        {
          name: 'date',
          type: 'date',
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
            console.log('Selected date:', data.date);
            this.currentData.date = data.date
          },
        },
      ],
    });
  
    await alert.present();
  }
  

}
