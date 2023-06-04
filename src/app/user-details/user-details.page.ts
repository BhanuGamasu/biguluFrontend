import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  profilePhoto: string;
  @ViewChild('photoContainer') photoContainer: ElementRef;
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadPhoto(file);
  }

  uploadPhoto(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.profilePhoto = event.target.result;
      this.cropPhoto();
    };
    reader.readAsDataURL(file);
  }

  cropPhoto() {
    const container = this.photoContainer.nativeElement;
    const image = container.querySelector('img');

    if (image) {
      const canvas = document.createElement('canvas');
      // const context = canvas.getContext('2d');
      const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      context.beginPath();
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        2 * Math.PI
      );
      context.clip();
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      this.profilePhoto = canvas.toDataURL();
    }
  }

  onClickTab(key: any, value: any) {
    this.tabData[key] = value;
  }

  back(){
    this.route.navigate(['tabs']);
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
