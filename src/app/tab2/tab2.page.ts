import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';

declare var google: any;

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
  currentData:any  = {date: 'Today', startDate: '', endDate: '', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
  startDate: Date;
  endDate: Date;
  // currentData:any  = {date: 'Today', time: 'Anytime', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
  currentSport: any;

  sports = ['badminton', 'cricket', 'ring', 'basketball', 'handball', 'hockey', 'golf', 'casual meetup', 'drinks']
  search: any;
  autocompleteService: any;
  predictions: any;
  openModal: boolean;
  openStartDate: boolean;
  openEndDate: boolean;
  selectedPrediction: any;
  constructor(
    private route: Router, 
    public loadingCtrl: LoadingController, 
    private fb: FormBuilder, 
    private alertController: AlertController, 
    private authService: AuthServiceService
    ) {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    }
    ionViewWillEnter() {
      this.search = '';
      this.selectedPrediction = ''
      this.currentData = {date: 'Today', startDate: '', endDate: '', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
    }
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
    console.log(this.currentData, 676);
    
    // for (let key in this.currentData) {
    //   if (this.currentData[key] == '') {
    //     return;
    //   }
    // }
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

  async onSearchInput() {
    if (this.search?.length > 0) {
      const loading = await this.loadingCtrl.create();
      this.autocompleteService.getPlacePredictions({ input: this.search }, (predictions:any, status:any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.predictions = predictions;
          console.log(predictions,465654);
          
        } else {
          this.predictions = [];
        }
      });
    } else {
      this.predictions = [];
    }
  }

  onPredictionSelect(prediction: any) {
    console.log('Selected prediction:', prediction);
    this.selectedPrediction = prediction;
    this.currentData.location = this.selectedPrediction;
    this.search = prediction.description
    const placeService = new google.maps.places.PlacesService(document.createElement('div'));
    placeService.getDetails({ placeId: prediction.place_id }, (placeResult: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // this.currentData.location = prediction.structured_formatting.main_text
        // console.log('Latitude:', placeResult.geometry.location.lat());
        // console.log('Longitude:', placeResult.geometry.location.lng());
        // this.currentData.latitude = placeResult.geometry.location.lat();
        // this.currentData.longitude = placeResult.geometry.location.lng();
        // this.currentData.placeId = prediction.place_id;
        // console.log('City:', placeResult.address_components.filter((c: any) => c.types.includes('locality'))[0]?.long_name);
      }
    });
    this.predictions = []
  }

  onClick(key: any, value: any) {
    console.log(key, value, this.currentData[key]);
    if (key == 'count' || key == 'description'){
      if (key == 'count') {
        value = parseInt(value.target.value);
      }
      value = value.target.value;
    }
    this.currentData[key] = value;
  }
  onWillDismiss(e: Event) {

  }
  changeDate(e: any, key: string) {
    console.log(e.target.value, 76276);
    this.currentData[key] = e.target.value
  }
  dismiss(key: string) {
    this[key] = false;
  }
  async openCalendar(key: string) {
    this[key] = true;
    // const presentDate = new Date();
    // const formattedPresentDate = presentDate.toISOString().split('T')[0];
  
    // const alert = await this.alertController.create({
    //   header: 'Select Date and Time',
    //   inputs: [
    //     {
    //       name: 'date',
    //       type: 'date',
    //       min: formattedPresentDate,
    //     },
    //     {
    //       name: 'startTime',
    //       type: 'time',
    //       placeholder: 'Start Time',
    //       min: '03:00'
    //     },
    //     {
    //       name: 'endTime',
    //       type: 'time',
    //       placeholder: 'End Time',
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //     },
    //     {
    //       text: 'Ok',
    //       handler: data => {
    //         const selectedDate = new Date(data.date);
    //         const startTime = data.startTime;
    //         const endTime = data.endTime;
    //         console.log(data, 878);
    //         this.startDate = selectedDate;
    //         this.startDate.setHours(data.startTime?.slice(0,2));
    //         this.startDate.setMinutes(data.startTime?.slice(3));
    //         // this.startDate.setSeconds(0);
    //         this.endDate = selectedDate

    //         this.endDate.setHours(data.endTime?.slice(0,2));
    //         this.endDate.setMinutes(data.endTime?.slice(3));
    //         console.log(selectedDate, this.startDate, this.endDate, 6876);
            
    //         this.currentData.startDate = this.startDate;
    //         this.currentData.endDate = this.endDate
    //         const startDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), startTime.split(':')[0], startTime.split(':')[1]);
    //         const endDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), endTime.split(':')[0], endTime.split(':')[1]);
            
    //         const formattedDate = startDateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    //         const formattedStartTime = startDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    //         const formattedEndTime = endDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            
    //         const formattedTimeSpan = `${formattedStartTime} - ${formattedEndTime}`;
    //         this.selectedTimeSpan = formattedTimeSpan;
    //         const formattedDateTimeSpan = `${formattedDate} ${formattedTimeSpan}`;
        
    //         // this.dateNew = selectedDate;
    //         // console.log(this.dateNew, selectedDate, formattedTimeSpan, 'dqdq');
    //         // selectedDate.setHours()
    //         // this.startDate = selectedDate
    //         this.currentData.date = selectedDate;
    //         this.currentData.timeSpan = formattedTimeSpan;
    //       },
    //     },
    //   ],
    // });
  
    // await alert.present();
  }

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentSport = ev.target.value;
    this.currentData.activityType = this.currentSport.sport
  }

  onSportSelected(event: any, key: string) {
    this.currentData[key] = event.target.value;
    console.log(event.target.value);
  }
  

}
