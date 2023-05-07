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
  currentData:any  = {activity: '', date: 'today', time: 'morning', gender:'anyone', age: 'anyone', count: 'single', category: '', location: ''};
  sports = ['badminton', 'cricket', 'ring', 'basketball', 'handball', 'hockey', 'golf', 'casual meetup', 'drinks'];
  predictions: any;
  search: any;
  autocompleteService: any;
  selectedPrediction: any;

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

  onSportSelected(event: any, key: string) {
    if (key == 'activity' || key == 'category') {
      console.log(event.target.value);
      this.currentData[key] = event.target.value;
    } else {
      console.log(event);
      this.currentData[key] = event;
    }
  }

  searchSubmit() {
    let keys = ['category', 'activity', 'location'];
    let formValid = true;
    keys.forEach(each => {
      if (this.currentData[each] == '') {
        formValid = false;
        return
      }
    })
    if (formValid) {
      this.auth.sendSearchData(this.currentData);
      this.nav.navigateBack(['tabs/tab1']);
    }
  }

}
