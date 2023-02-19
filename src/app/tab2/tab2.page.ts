import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputValue: string='';
  constructor(private route: Router, private alertController: AlertController) {}

  ngOninit(){
    this.publish()
  }

  publish(){
    localStorage.setItem('inputValue', this.inputValue);
    this.route.navigateByUrl('tabs/tab2')
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
