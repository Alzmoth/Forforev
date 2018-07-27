import { Component } from '@angular/core';
import {  NavController, NavParams, App,Nav,Refresher,ToastController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import {SiparisListeDetayPage  } from '../siparis-liste-detay/siparis-liste-detay'
/**
 * Generated class for the SiparisListePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-siparis-liste',
  templateUrl: 'siparis-liste.html',
})
export class SiparisListePage {
  public resposeData: any;
  public dataSet: any[] = [];
  public noRecord: boolean;
  stokPostData = {
    "user_id": "",
    "token": "",
    "stok_kayit_id": "",
    "sayac":0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthService,
    public app: App,
    public toastCtrl: ToastController,
    public nav:Nav) {
    this.noRecord = false;

  }

  ionViewDidLoad() {
  
    this.getliste();

  }


  getliste() {
    console.log("asd");
    this.authService.postData(this.stokPostData, "siparis_listesi_getir")
      .then((result) => {
        this.resposeData = result;
        this.dataSet = this.resposeData.feedData;
        console.log(this.dataSet);

      }, (err) => {
        //Connection failed message
      });

  }

  doInfinite(): Promise<any> {
    console.log("Begin async operation");

    return new Promise(resolve => {
      setTimeout(() => {
        this.stokPostData.sayac += 50;

        this.authService.postData(this.stokPostData, "siparis_listesi_getir")
          .then(
            result => {
              this.resposeData = result;
              if (this.resposeData.feedData.length) {
                const newData = this.resposeData.feedData;
                // kontrol et
                for (let i = 0; i < newData.length; i++) {
                  this.dataSet.push(newData[i]);

                }
                console.log(this.stokPostData.sayac)
              } else {
                this.noRecord = true;
              }

            },
            err => {
              //Connection failed message
            }
          );
        // api çagırılır

        console.log("Async operation has ended");
        resolve();
      }, 200);
    });
  }
  saatCevir(time) {

    let a = new Date(time * 1000);
    return a;
  }

  itemTapped(event, item) {
    this.nav.push(SiparisListeDetayPage, { item: item });
    console.log("gönderilen item", item)
  }
  doRefresh(refresher: Refresher) {

    this.getliste();
    // simulate a network request that would take longer
    // than just pulling from out local json file
    setTimeout(() => {
      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Yenilendi',
        duration: 1000
      });
      toast.present();
    }, 1000);

  }

}

