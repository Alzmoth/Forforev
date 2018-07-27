import { Component } from '@angular/core';
import {  NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { StokListeDetayPage } from '../stok-liste-detay/stok-liste-detay'
/**
 * Generated class for the StokListePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-stok-liste',
  templateUrl: 'stok-liste.html',
})
export class StokListePage {

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
    public app: App) {
    this.noRecord = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StokListePage');
    this.getliste();
    

  }


  getliste() {
    console.log("asd");
    this.authService.postData(this.stokPostData, "stok_listesi_getir")
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

        this.authService.postData(this.stokPostData, "stok_listesi_getir")
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
    this.navCtrl.push(StokListeDetayPage, { item: item });
    console.log("gönderilen item",item)
  }

}

