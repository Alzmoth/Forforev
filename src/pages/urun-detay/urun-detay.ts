import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController } from 'ionic-angular';
import { Urun } from '../../entities/sayimurun'
import { AuthService } from "../../providers/auth-service";
import {stoksepetprovider} from '../../providers/stok-sepet-provider'

@Component({
  selector: 'page-urun-detay',
  templateUrl: 'urun-detay.html',
})
export class UrunDetayPage {

  public resposeData: any;
  public gonderilen: any;
  public userDetails: any;
  public userdata = {
    "user_id": "",
    "token": "",

  };

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public stoksepetservis:stoksepetprovider,
     public toastController:ToastController,
      public authService: AuthService) {
    this.selectedUrun = navParams.get('item');
  

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userdata.user_id = this.userDetails.user_id;
    this.userdata.token = this.userDetails.token;

    
  }
  selectedUrun: Urun;



  ionViewDidLoad() {
 
  }

  
  addToCart(urun:Urun){

    this.stoksepetservis.addToCart(urun);

    this.gonderilen = urun;
    this.gonderilen.user_id = this.userdata.user_id;
    this.gonderilen.token = this.userdata.token;



  
    this.authService.postData(this.gonderilen, "stok_sepet_kaydet")
      .then((result) => {
        this.resposeData = result;


      }, (err) => {
        //Connection failed message
      });
    
    this.showToast(); 
    
      this.navCtrl.pop();
     
    
  }
  showToast(){
    let toast=this.toastController.create({
      message:'Urun Sayim Listesine Eklendi',
      duration:50,
      position:'bottom'
    });
    toast.present();
  }


}

