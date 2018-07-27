import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";

import {Login} from "../login/login";
import { SiparisTabsPage } from '../siparis-tabs/siparis-tabs';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class Signup {
  resposeData : any;
  userData = {"username":"", "password":"","email":"","name":""};
  constructor(public navCtrl : NavController, public authService : AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup() {
    if(this.userData.username && this.userData.password && this.userData.name){
      //Api connections
    this.authService.postData(this.userData, "signup").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    localStorage.setItem('userData', JSON.stringify(this.resposeData) )
    this.navCtrl.push(SiparisTabsPage);
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    console.log("Give valid information.");
  }
  
  }

  login() {
    this
      .navCtrl
      .push(Login);
  }

}
