import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

declare var google: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  storageData = '';

  autocompleteService: any;
  search: string = '';
  predictions: any[] = [];

  constructor(private route: Router, public loadingCtrl: LoadingController) {
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  ngOnInit(){
    let storeData = localStorage.getItem('inputValue');
    this.storageData = storeData as string;
  }

  async onSearchInput() {
    if (this.search.length > 0) {
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
        console.log('Latitude:', placeResult.geometry.location.lat());
        console.log('Longitude:', placeResult.geometry.location.lng());
        console.log('City:', placeResult.address_components.filter((c: any) => c.types.includes('locality'))[0]?.long_name);
      }
    });
  }
}
