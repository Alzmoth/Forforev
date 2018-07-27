import { Component } from '@angular/core';

import {  NavController, NavParams, ToastController } from 'ionic-angular';

import { Urun } from '../../entities/urunler'
/**
 * Generated class for the SiparisListeUrunDetayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-siparis-liste-urun-detay',
  templateUrl: 'siparis-liste-urun-detay.html',
})
export class SiparisListeUrunDetayPage {

  public resposeData: any;
  public dataSet: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
  ) {
    this.selectedUrun = navParams.get('item');
    console.log("gelen urun",this.selectedUrun)

    if (this.selectedUrun.stok_olcu_birim == "DZ") {
      this.selectedUrun.stok_olcu_birim = "Düzine"
    }
    if (this.selectedUrun.stok_olcu_birim == "AD") {
      this.selectedUrun.stok_olcu_birim = "Adet"
    }
    if (this.selectedUrun.stok_olcu_birim == "TK") {
      this.selectedUrun.stok_olcu_birim = "Takım"
    }




  }
  selectedUrun: Urun;



  ionViewDidLoad() {

  }


  addToCart(urun: Urun) { //yeni addtocard eklenecek satış için

 
    this.showToast();
    console.log("Bu lazım",this.selectedUrun)

    this.navCtrl.pop();

  }
  showToast() {
    let toast = this.toastController.create({
      message: 'Urun Duzenlendi',
      duration: 50,
      position: 'bottom'
    });
    toast.present();
  }


}
