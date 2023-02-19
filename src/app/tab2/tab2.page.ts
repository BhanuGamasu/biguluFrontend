import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputValue: string='';
  createActivity: FormGroup;
  activityData: any;
  currentData:any  = {date: 'Today', time: 'Anytime', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
  constructor(private route: Router, private fb: FormBuilder, private alertController: AlertController) {}

  ngOninit(){
    
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
          },
        },
      ],
    });
  
    await alert.present();
  }
  

}
