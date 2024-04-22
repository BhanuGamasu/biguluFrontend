import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.page.html',
  styleUrls: ['./activity-overview.page.scss'],
})
export class ActivityOverviewPage implements OnInit {
  id: string;
  activityData: any;
  profilePic: any;

  constructor(private route: Router, private auth: AuthServiceService, private location: Location) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.route.url.split('/')[2];
    this.auth.getAcivityInfo({activityId: this.id}).subscribe(val => {
      this.activityData = val.data[0];
      if(this.activityData?.activityCreatedBy?.gridfsId) {
        this.getProfileImage(this.activityData.activityCreatedBy.gridfsId)
      } else {
        this.profilePic = this.activityData.activityCreatedBy?.imageUrl
      }
    }, err => {
      console.log(err, 8786);
      
    })
     this.route.url
  }

  editActivity() {
    this.auth.sendActivityData(this.activityData);
    this.route.navigate(['/editActivity/' + this.id])
  }

  getProfileImage(gridfsId: any) {
    this.auth.getImage({gridfsId}).subscribe((val: any) => {
      if (val.success) {
        this.profilePic = atob(val.data.data);
      }
    })
  }

  getSentence() {
    let a = this.activityData?.isVisitor ? this.activityData?.userActions?.joined ? 'Cancel Invite': 'JOIN NOW' : 'Cancel Activity'
    // if (activityData?.userActions?.isVisitor) {
      return a
    // }
  }

  updateData(key: any, value: any) {
    if (this.activityData?.isVisitor || key == 'favorite') {
      this.auth.updateVisData({key, value, activityId: this.id}).subscribe(val => {
        this.activityData = val.data[0];
        
      }, err => {
        console.log(err);
        
      })
    } else {
      this.auth.deleteActivity({id: this.id}).subscribe(val => {
        if (val.success) {
          this.route.navigate(['/tabs/tab1']);
        }
      }, err => {
        console.log(err);
        
      })
    }
  }

  closeTab() {
    this.auth.updateInitiation();
    // this.location.back()
    this.route.navigateByUrl('/tabs/tab1')
  }

  getLastSeen(visData: any) {
    if (visData?.lastSeen) {
      let diff = new Date().getDate() - new Date(visData.lastSeen).getDate();
      if (diff > 0) {
        return "seen " + diff + " day back";
      } else {
        return "seen today";
      }
    }else {
      return "not seen yet"
    }
  }

  getProfileOverview(){
    this.route.navigateByUrl('profile-overview/' + this.activityData?.activityCreatedBy?._id)
  }

  invitesView() {
    this.route.navigate(['/invites/' + this.id])
  }

  navigateTo() {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${this.activityData.latitude},${this.activityData.longitude}&query_place_id=${this.activityData.placeId}`;
      window.open(mapUrl, '_blank');
  }

  ionViewWillLeave() {
    this.auth.updateInitiation();
  }

  shareLink() {
    if (navigator.share) {
      const startDate = this.activityData?.startDate;
      const locationDescription = this.activityData?.location?.description;
      const activityDescription = this.activityData?.description;
  
      let text = `Activity Details\n`;
  
      if (activityDescription) {
        if (activityDescription.length > 70) {
          text += `${activityDescription.substring(0, 70)}...\n`;
        } else {
          text += `${activityDescription}\n`;
        }
      }
  
      if (startDate) {
        const formattedStartDate = new Date(startDate).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
        text += `START DATE: ${formattedStartDate}\n`;
      }
      if (locationDescription) {
        text += `LOCATION: ${locationDescription}\n`;
      }
  
      navigator.share({
        text: text,
        url: location.href
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      console.log('Web Share API not supported.');
    }
  }
  
}
