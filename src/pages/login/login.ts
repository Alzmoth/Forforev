import { Component } from '@angular/core';
import {  NavController, ToastController } from 'ionic-angular';
import { SiparisTabsPage } from '../siparis-tabs/siparis-tabs'
import {AuthService} from "../../providers/auth-service";
import { Storage } from '@ionic/storage'; 
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  
  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController,
    public authService: AuthService, private toastCtrl:ToastController,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
   if(this.userData.username && this.userData.password){
    this.authService.postData(this.userData, "login").then((result) =>{
    this.resposeData = result;
    
   
    if(this.resposeData.userData){
     localStorage.setItem('userData', JSON.stringify(this.resposeData) )
     this.navCtrl.setRoot(SiparisTabsPage);
  }
  else{
    this.presentToast("Kullanici adi yada Sifre Yanlis");
  }
    


    }, (err) => {
      //Connection failed message
    });
   }
   else{
    this.presentToast("Kullanici adi ve sifre eksik");
   }
  
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
