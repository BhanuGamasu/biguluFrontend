import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  email: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  userDataForm: FormGroup;
  showTop: Boolean = true;
  userData: any = localStorage.getItem('user');
  tabData = {gender: '', age: ''};
    constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: Router) {
    this.userData = JSON.parse(this.userData)
    this.userDataForm = this.fb.group({
      userName: [this.userData.name, Validators.required],
      email: [this.userData.email, Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      aboutMe: '',
      bio: '',
      faceBookId: '',
      instagramId: '',
      youTubeId: '',
      twitterId: '',
    })
   }

  ngOnInit() {
  }

  onClickTab(key: any, value: any) {
    this.tabData[key] = value;
  }

  submit() {
    if (this.userDataForm.valid) {
      console.log(this.userDataForm.value);
      let data = {...this.userDataForm.value, ...this.tabData, ...this.userData}
      this.auth.login(data).subscribe(val => {
        if (val.success) {
          localStorage.setItem('token', val.data);
          this.route.navigate(['tabs/tab1'])
        }
      })
    }
    console.log(this.userDataForm.value);
  }

}
