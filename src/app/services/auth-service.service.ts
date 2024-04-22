import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment'
// import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  searchData: any = {};
  public searchVal = new Subject();
  public searchVal$ = this.searchVal.asObservable();

  public initiatePage = new Subject();
  public initiatePage$ = this.initiatePage.asObservable();
  activityData: any;

  constructor(private http: HttpClient, private route: Router) { }

  login(loginData: any): Observable<any> {
    // let data = {
    //   name: 'prem kumar',
    //   ...loginData,
    //   mobile: '8186998684',
    //   city: 'kakinada',
    //   gender: 'male',
    //   age: 24,
    //   aboutMe: 'nothing',
    //   bio: 'some biodata',
    //   faceBookId: '',
    //   instagramId: '',
    //   youTubeId: '',
    //   twitterId: '',
    // }
    return this.http.post(environment.baseUrl + "auth/login", loginData);
  }

  getSearchData() {
    return this.searchData
  }

  updateInitiation() {
    this.initiatePage.next(true);
  }

  sendActivityData(data: any) {
    this.activityData = data;
  }

  getEditData() {
    return this.activityData;
  }

  sendSearchData(data: any) {
    this.searchVal.next(data);
  }

  checkUser(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/checkUser", data);
  }

  uploadImage(data: any) {
    return this.http.post(environment.baseUrl + "auth/uploadImage", {data});
  }

  getImage(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/getImage", data);
  }

  getProfileInfo(): Observable<any> {
    return this.http.get(environment.baseUrl + 'auth/getProfileInfo')
  }

  getProfile(id: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/getProfile", id);
  }

  getFilterData(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/getFilterData", data);
  }

  deleteActivity(id: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/deleteActivity", id);
  }

  getAcivityInfo(activityId: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/getAcivityInfo", activityId);
  }

  updateVisData(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/updateActivity", data)
  }

  getInvitesData(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/invites", data)
  }

  updateAcceptInfo(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/updateAcceptInfo", data)
  }

  acceptInfo(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/acceptInfo", data)
  }

  editActivity(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/editActivity", data)
  }

  createActivity(data: any): Observable<any> {
    // let user: any = localStorage.getItem('user');
    // user = JSON.parse(user);
    
    // let a = {
    //   location: 'hyderabad',
    //   activityType: 'cricket',
    //   date: 'today',
    //   time: 'evening',
    //   genderChoice: 'female',
    //   age: '18-24',
    //   maxPeople: 2,
    //   aboutActivity: 'nothing',
    //   data: user
    // }
    return this.http.post(environment.baseUrl + 'auth/createActivity', data);
  }
  getAllActivities(): Observable<any> {
    return this.http.get(environment.baseUrl + 'auth/getAllActivities');
  }

  getCustomActivities(type: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/getCustomActivities', type);
  }

  logout() {
    localStorage.clear()
    this.route.navigate(['login']);
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      // this.authenticationState.next(true);
      return true;
    } else {
      // this.authenticationState.next(false);
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // getLocation() {
  //   let data: any = {}
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     data.lat = resp.coords.latitude;
  //     data.lng = resp.coords.longitude;
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=AIzaSyDHD_UputIOSkl8aL6Q7zH30Yypkw-5lO4`;

  //   this.http.get(url).subscribe((data1: any) => {
  //     const address_components = data1.results[0].address_components;

  //     for (const component of address_components) {
  //       if (component.types.indexOf('locality') > -1) {
  //         data.city = component.long_name;
  //       }
  //       if (component.types.indexOf('sublocality') > -1) {
  //         data.town = component.long_name;
  //       }
  //     }
  //     return data;
  //   });
  //     // this.getCityTownName(data);
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  // getCityTownName(data1: any) {
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data1.lat},${data1.lng}&key=AIzaSyDHD_UputIOSkl8aL6Q7zH30Yypkw-5lO4`;

  //   this.http.get(url).subscribe((data: any) => {
  //     const address_components = data.results[0].address_components;

  //     for (const component of address_components) {
  //       if (component.types.indexOf('locality') > -1) {
  //         data1.city = component.long_name;
  //       }
  //       if (component.types.indexOf('sublocality') > -1) {
  //         data1.town = component.long_name;
  //       }
  //     }

  //     console.log('City:', data1.city);
  //     console.log('Town:', data1.town);
  //   });
  // }
}
