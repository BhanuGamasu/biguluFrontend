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
  currentData:any  = {date: 'Today', startDate: '', endDate: '', gender:'Anyone', age: 'Anyone', count: 1, category: '', location: 'Miyapur Hyderabad'};
  startDate: Date;
  endDate: Date;
  // currentData:any  = {date: 'Today', time: 'Anytime', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
  currentSport: any;

  sports = [
    'Entertainment', 
    'Dining out', 
    'Drink Buddy', 
    'Clubbing', 
    'Beach Party', 
    'Shopping', 
    'Food Tour', 
    'Book Club', 
    'Music Jam', 
    'Gaming Session', 
    'Backpacking', 
    'Travel', 
    'Road Trip', 
    'Adventure Tourism', 
    'Sightseeing', 
    'Fitness',
    'Cultural Festival', 
    'Outdoor Games', 
    'Outdoor Adventure', 
    'Volunteering', 
    'Film and Movie Nights', 
    'Coding or Hackathons',
  ];
  sportDesc = {
    'Entertainment': 'Invite Bigulus If you had extra tickets for a movie , music concert or game',
    'Dining out': 'Indulge in delicious food, try different cuisines, and socialize', 
    'Drink Buddy': 'Drink Buddy', 
    'Clubbing': "Let/'s Hit the Club! for a Night of Fun and Dancing", 
    'Beach Party': "Beach Party", 
    'Shopping': "Join flea markets", 
    'Food Tour': "Explore local cuisine by joining food tours that allow you to taste traditional dishes and specialties.", 
    'Book Club': "Join book clubs to discuss literature, share book recommendations, and engage in intellectual conversations with fellow avid readers.", 
    'Music Jam': "Gather with fellow musicians to jam, collaborate, and share a passion for playing instruments or singing.", 
    'Gaming Session': "Engage in multiplayer gaming sessions with like-minded gamers, either online or in-person, fostering a sense of camaraderie and competition.", 
    'Backpacking': "Backpacking", 
    'Travel': 'Travel', 
    'Road Trip': "Take a road trip to explore scenic routes, picturesque landscapes, and hidden gems.", 
    'Adventure Tourism': "Engage in thrilling activities like bungee jumping, paragliding, hiking, or white-water rafting in scenic destinations.", 
    'Sightseeing': " Visit famous landmarks, historical sites, and iconic attractions in different cities and countries.", 
    'Fitness': "Find a bigulu to workout to stay active, stay fit.",
    'Cultural Festival': "Attend festivals and celebrations to immerse yourself in local traditions, music, dance, and cuisine.", 
    'Outdoor Games': "Looking for an extra player or a team? Post here.", 
    'Outdoor Adventure': "Form or join groups for outdoor activities like hiking, rock climbing, kayaking, or camping, connecting with nature enthusiasts.", 
    'Volunteering': "Engage in volunteer work or community service projects, connecting with individuals who share a passion for making a positive impact on society.", 
    'Film and Movie Nights': "Organize or join film clubs to watch and discuss movies, exploring different genres and engaging in cinematic conversations.", 
    'Coding or Hackathons': " Participate in coding workshops, hackathons, or programming groups where individuals collaborate on coding projects and share knowledge."
  };
  currentTime: any = new Date().toISOString()
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
      this.currentData = {date: 'Today', startDate: '', endDate: '', activityName: '', gender:'Anyone', age: 'Anyone', count: 1, location: 'Miyapur Hyderabad',description:''};
      if (window.location.pathname.includes('editActivity')) {
        let activityData = this.authService.getEditData();
        if (activityData){
          this.setPreselect(activityData)
        } else {
          let id = this.route.url.split('/')[2];
          this.authService.getAcivityInfo({activityId: id}).subscribe(val => {
            activityData = val.data[0];
            this.setPreselect(activityData)
          }, err => {
            console.log(err, 8786);
            
          })
        }
        
      }
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

  setPreselect(activityData: any) {
    this.currentData = {
      _id: activityData._id,
      date: activityData.date, 
      startDate: activityData.startDate, 
      endDate: activityData.endDate, 
      activityName: activityData.activityName, 
      gender: activityData.gender, 
      age: activityData.age, 
      count: activityData.count, 
      location: activityData.location, 
      description: activityData.description,
    }
    this.search = activityData.location.description
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
    
    for (let key in this.currentData) {
      if (this.currentData[key] == '' && key != 'endDate') {
        return;
      }
    }
    if (window.location.pathname.includes('editActivity')) {
      this.authService.editActivity(this.currentData).subscribe(val => {
        if (val.success) {
          this.route.navigate(['tabs/tab1'])
        }
      })
    } else {
      this.authService.createActivity(this.currentData).subscribe(val => {
        if (val.success) {
          this.route.navigateByUrl('tabs/tab1')
        }
      })
    }
  }

  async onSearchInput() {

    if (this.search?.length > 0) {
      const loading = await this.loadingCtrl.create();
      this.autocompleteService.getPlacePredictions({ input: this.search }, (predictions:any, status:any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.predictions = predictions;
        } else {
          this.predictions = [];
        }
      });
    } else {
      this.predictions = [];
    }
  }

  back() {
    if (window.location.pathname.includes('editActivity')) {
      this.route.navigate(['/activity-overview/' + this.currentData._id])
      return
    }
    this.route.navigate(['tabs'])
  }

  onPredictionSelect(prediction: any) {
    this.selectedPrediction = prediction;
    this.currentData.location = this.selectedPrediction;
    this.search = prediction.description
    const placeService = new google.maps.places.PlacesService(document.createElement('div'));
    placeService.getDetails({ placeId: prediction.place_id }, (placeResult: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // this.currentData.location = prediction.structured_formatting.main_text
        // this.selectedPrediction.latitude = placeResult.geometry.location.lat();
        // this.selectedPrediction.longitude = placeResult.geometry.location.lng();
        // this.currentData.location = this.selectedPrediction;
        this.currentData.latitude = placeResult.geometry.location.lat();
        this.currentData.longitude = placeResult.geometry.location.lng();
        this.currentData.placeId = prediction.place_id;
        // console.log('City:', placeResult.address_components.filter((c: any) => c.types.includes('locality'))[0]?.long_name);
      }
    });
    this.predictions = []
  }

  onClick(key: any, value: any) {
    if (key == 'count' || key == 'description'){
      if (key == 'count') {
        value = parseInt(value.target.value);
        this.currentData[key] = value;
        return
      }
      value = value.target.value;
    }
    this.currentData[key] = value;
  }
  onWillDismiss(e: Event) {

  }
  changeDate(e: any, key: string) {
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
  }
  

}
