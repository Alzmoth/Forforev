import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { stoksepetprovider } from '../../providers/stok-sepet-provider'
import { SayimSepetUrun } from '../../entities/sayim-sepet-urun'

import { Common } from "../../providers/common";
import { AuthService } from "../../providers/auth-service";
/**
 * Generated class for the StokSepetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: "page-stok-sepet",
  templateUrl: "stok-sepet.html"
})
export class StokSepetPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stoksepetservis: stoksepetprovider,
    public common: Common,
    public authService: AuthService,
    public toastController: ToastController,
    public alertCtrl: AlertController
  ) {}
  //componentler
  public userDetails: any;

  //liste adı ve userid de gönderilmesi gerekiyor

  sayimsepetUrun: SayimSepetUrun[] = [];
  stok_fatura = {
    aciklama: ""
  };

  ionViewDidLoad() {
    this.sayimsepetUrun = this.stoksepetservis.list();

    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
  }

  kaydet() {
    this.stoksepetservis.stokkayit(this.stok_fatura.aciklama);
    this.stok_fatura.aciklama = "";
    this.showToast();
  }
  sil() {
    let alert = this.alertCtrl.create({
      title: "Sepeti Temizle",
      message: "Sepeti silmek istedinizden emin misiniz?",
      buttons: [
        {
          text: "İptal",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Sil",
          handler: () => {
            this.sildir();
          }
        }
      ]
    });
    alert.present();
  }

  sildir() {
    this.stok_fatura.aciklama = "";

    this.stoksepetservis.clear();
    this.stoksepetservis.clearveritabani();
  }


  showToast() {
    let toast = this.toastController.create({
      message: "Liste kaydedildi",
      duration: 1000,
      position: "middle"
    });
    toast.present();
  }
}
