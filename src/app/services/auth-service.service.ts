import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private route: Router) { }

  login(loginData: any): Observable<any> {
    let data = {
      name: 'prem kumar',
      ...loginData,
      mobile: '8186998684',
      city: 'kakinada',
      gender: 'male',
      age: 24,
      aboutMe: 'nothing',
      bio: 'some biodata',
      faceBookId: '',
      instagramId: '',
      youTubeId: '',
      twitterId: '',
    }
    return this.http.post(environment.baseUrl + "auth/login", data);
  }

  createActivity(data: any): Observable<any> {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    console.log(user);
    
    let a = {
      location: 'hyderabad',
      activityType: 'cricket',
      date: 'today',
      time: 'evening',
      genderChoice: 'female',
      age: '18-24',
      maxPeople: 2,
      aboutActivity: 'nothing',
      data: user
    }
    return this.http.post(environment.baseUrl + 'auth/createActivity', a);
  }
  getAllActivities(): Observable<any> {
    return this.http.get(environment.baseUrl + 'auth/getAllActivities');
  }

  logout() {
    localStorage.clear()
    this.route.navigate(['login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
