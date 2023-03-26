import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

declare var google: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  currentSport: any;
  currentData:any  = {date: 'Today', startDate: '', endDate: '', time: 'Anytime', gender:'Anyone', age: 'Anyone', count: '', category: '', location: 'Miyapur Hyderabad'};
  sports = ['badminton', 'cricket', 'ring', 'basketball', 'handball', 'hockey', 'golf', 'casual meetup', 'drinks'];
  predictions: any;
  search: any;
  autocompleteService: any;

  constructor(
    public loadingCtrl: LoadingController, 
    private alertController: AlertController,) {
      this.autocompleteService = new google.maps.places.AutocompleteService();
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
  
    const placeService = new google.maps.places.PlacesService(document.createElement('div'));
    placeService.getDetails({ placeId: prediction.place_id }, (placeResult: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.currentData.location = prediction.structured_formatting.main_text
        console.log('Latitude:', placeResult.geometry.location.lat());
        console.log('Longitude:', placeResult.geometry.location.lng());
        this.currentData.latitude = placeResult.geometry.location.lat();
        this.currentData.longitude = placeResult.geometry.location.lng();
        this.currentData.placeId = prediction.place_id;
        console.log('City:', placeResult.address_components.filter((c: any) => c.types.includes('locality'))[0]?.long_name);
      }
    });
    this.predictions = []
  }

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentSport = ev.target.value;
  }

  onSportSelected(event: any) {
    console.log(event.target.value);
  }

}
