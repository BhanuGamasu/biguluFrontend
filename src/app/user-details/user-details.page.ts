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
  profiles: any = [
    'Student',
    'Professional',
    'Manager',
    'Director',
    'CEO/Founder',
    'Entrepreneur',
    'Freelancer',
    'Consultant',
    'Artist',
    'Writer',
    'Teacher',
    'Engineer',
    'Doctor',
    'Lawyer',
    'Accountant',
    'Architect',
    'Designer',
    'Developer/Programmer',
    'Sales Representative',
    'Marketing Specialist',
    'Human Resources (HR)',
    'Operations Manager',
    'Analyst',
    'Researcher',
    'Scientist',
    'Nurse',
    'Pharmacist',
    'Chef',
    'Athlete',
    'Fitness Instructor/Trainer',
    'Photographer',
    'Musician',
    'Dancer',
    'Actor/Actress',
    'Media Professional',
    'Journalist',
    'Public Relations (PR)',
    'Government Employee',
    'Nonprofit Worker',
    'Retired',
    'Homemaker',
    'Student-Athlete',
    'Fashion Designer',
    'Event Planner',
    'Traveler/Explorer',
    'Social Media Influencer',
    'Blogger/Vlogger',
    'Investor',
    'Financial Advisor',
    'Other',
  ]
  @ViewChild('photoContainer') photoContainer: ElementRef;
    constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: Router) {
    this.userDataForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      aboutMe: '',
      bio: '',
      faceBookId: '',
      instagramId: '',
      youTubeId: '',
      twitterId: '',
      showMobile: true,
      profiletype: ['', Validators.required]
    })
   }

  ngOnInit() {
    // this.userData = JSON.parse(this.userData);
    // if (!this.userData.newUser) {
      this.auth.getProfileInfo().subscribe((data: any) => {
        if (data.success) {
          this.userData = data.data;
          this.userData.gridfsId && this.getProfileImage(this.userData.gridfsId);
          if (!this.userData?.gridfsId) {
            this.profilePhoto = this.userData?.imageUrl;
          }
          this.patchUserData();
          this.tabData = {gender: this.userData?.gender, age: this.userData?.age}
        }
      }, err => {
        console.log("Error",err);
      })
    // } else {
    //   this.profilePhoto = this.userData?.imageUrl;
    //   this.patchUserData()
    // }
  }

  // toggleChanged() {
  //   const toggleValueControl = this.userDataForm.get('toggleValue');
  //   if (toggleValueControl) {
  //     console.log(toggleValueControl.value);
  //   }
  // }
  
  patchUserData() {
    this.userDataForm.patchValue({
      userName: this.userData?.name,
      email: this.userData?.email,
      mobile: this.userData?.mobile,
      city: this.userData?.city,
      aboutMe: this.userData?.aboutMe,
      bio: this.userData?.bio,
      faceBookId: this.userData?.faceBookId,
      instagramId: this.userData?.instagramId,
      youTubeId: this.userData?.youTubeId,
      twitterId: this.userData?.twitterId,
      showMobile: this.userData?.showMobile,
      profiletype: this.userData?.profiletype
    })
  }

  onFileSelected(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        let base64ToString = btoa(event.target.result);
        this.auth.uploadImage(base64ToString).subscribe((val: any) => {
          if (val.success) {
            this.getProfileImage(val.gridfsId);            
          }
        })
      }
    }
    // const file = event.target.files[0];
    // console.log(file, 875876);
    
    // this.uploadPhoto(file);
  }

  getProfileImage(gridfsId: any) {
    this.auth.getImage({gridfsId}).subscribe((val: any) => {
      if (val.success) {
        this.profilePhoto = atob(val.data.data);
      }
    })
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
    if (this.userDataForm.valid) {
      this.route.navigate(['tabs']);
      this.auth.updateInitiation();
    }
  }

  submit() {
    
    if (this.userDataForm.valid) {
      let data = {...this.userData, ...this.userDataForm.value, ...this.tabData}
      this.auth.login(data).subscribe(val => {
        if (val.success) {
          delete this.userData['userType']
          localStorage.setItem('user', JSON.stringify(this.userData))
          localStorage.setItem('token', val.data);
          let previousRoute = localStorage.getItem('previousPath');
          if (previousRoute) {
            this.route.navigate([previousRoute])
          } else {
            this.auth.updateInitiation()
            this.route.navigate(['tabs/tab1'])
          }
        }
      })
    }
  }

}
