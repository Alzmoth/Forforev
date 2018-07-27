import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { Login } from '../login/login';
import { Signup } from '../signup/signup';

import { SiparisTabsPage } from '../siparis-tabs/siparis-tabs';
/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
   if(localStorage.getItem('userData')){
     this.navCtrl.setRoot(SiparisTabsPage);
   }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
  }

  login(){
   this.navCtrl.push(Login,{},{animate:false});
  }

  signup(){
   this.navCtrl.push(Signup, {}, {animate:false});
  }

}
