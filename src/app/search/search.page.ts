import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

declare var google: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  currentSport: any;
  currentData:any  = {date: 'today', time: 'morning', gender:'anyone', activityName: '', age: 'anyone', count: 'single', location: ''};
  // sports = ['badminton', 'cricket', 'ring', 'basketball', 'handball', 'hockey', 'golf', 'casual meetup', 'drinks'];
  predictions: any;
  search: any;
  autocompleteService: any;
  selectedPrediction: any;
  sports = [
    'Entertainment tickets', 
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
    'Cultural Festival', 
    'Outdoor Games', 
    'Outdoor Adventure', 
    'Volunteering', 
    'Film and Movie Nights', 
    'Coding or Hackathons'
  ];
  sportDesc = {
    'Entertainment tickets': 'Invite Bigulus If you had extra tickets for a movie , music concert or game',
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
    'Cultural Festival': "Attend festivals and celebrations to immerse yourself in local traditions, music, dance, and cuisine.", 
    'Outdoor Games': "Looking for an extra player or a team? Post here.", 
    'Outdoor Adventure': "Form or join groups for outdoor activities like hiking, rock climbing, kayaking, or camping, connecting with nature enthusiasts.", 
    'Volunteering': "Engage in volunteer work or community service projects, connecting with individuals who share a passion for making a positive impact on society.", 
    'Film and Movie Nights': "Organize or join film clubs to watch and discuss movies, exploring different genres and engaging in cinematic conversations.", 
    'Coding or Hackathons': " Participate in coding workshops, hackathons, or programming groups where individuals collaborate on coding projects and share knowledge."
  }

  constructor(
    public loadingCtrl: LoadingController, 
    private auth: AuthServiceService,
    private nav: NavController,
    private route: Router,
    private alertController: AlertController,) {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      console.log('search');
     }

  ngOnInit() {
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

  onPredictionSelect(prediction: any) {
    console.log('Selected prediction:', prediction);
    this.selectedPrediction = prediction;
    this.search = prediction.description;
    this.currentData.location = prediction?.structured_formatting?.main_text;
    const placeService = new google.maps.places.PlacesService(document.createElement('div'));
    console.log(placeService, 101010);
    
    placeService.getDetails({ placeId: prediction.place_id }, (placeResult: any, status: any) => {
      console.log(google.maps.places.PlacesServiceStatus.OK, 8178132);
      
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.currentData.location = prediction.structured_formatting.main_text
        console.log('Latitude:', placeResult.geometry.location.lat());
        console.log('Longitude:', placeResult.geometry.location.lng());
        this.currentData.latitude = placeResult.geometry.location.lat();
        this.currentData.longitude = placeResult.geometry.location.lng();
        this.currentData.placeId = prediction.place_id;
        console.log('City:', placeResult.address_components.filter((c: any) => c.types.includes('locality'))[0]?.long_name);
      }
    }, (err: any) => {
      console.log(err, 33333);
      
    });
    this.predictions = []
  }

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentSport = ev.target.value;
  }

  back() {
    this.route.navigate(['tabs'])
  }

  onSportSelected(event: any, key: string) {
    if (key == 'activityName' || key == 'category') {
      console.log(event.target.value);
      this.currentData[key] = event.target.value;
    } else {
      console.log(event);
      this.currentData[key] = event;
    }
  }

  searchSubmit() {
    let keys = ['activityName', 'location'];
    let formValid = true;
    keys.forEach(each => {
      if (this.currentData[each] == '') {
        formValid = false;
        return
      }
    })
    console.log(formValid, this.currentData, 4567898765);
    
    if (formValid) {
      this.auth.sendSearchData(this.currentData);
      this.nav.navigateBack(['tabs/tab1']);
    }
  }

}
