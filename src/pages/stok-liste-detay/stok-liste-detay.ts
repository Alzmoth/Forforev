import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { StokListePage } from '../stok-liste/stok-liste'
import { ListeGosterPage } from '../liste-goster/liste-goster'


/**
 * Generated class for the StokListeDetayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-stok-liste-detay',
  templateUrl: 'stok-liste-detay.html',
})
export class StokListeDetayPage {


  saveData: any[] = [];
  resposeData: any;
  gelen: any;
  public dataSet: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public authService: AuthService,
    public toastController: ToastController) {

    this.gelen = navParams.get('item');

    console.log("gelen",this.gelen)
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StokListeDetayPage');
    this.stok_liste_detay_getir()
    console.log("dataset", this.dataSet)
  }

  //download
 

  downloadCSV() {

    this.dataSet.forEach(element => {

      element.iskontolu_satis_fiyati = element.satis_fiyati - ((element.satis_fiyati / 100) * element.sabit_iskonto)
      element.toplam_fiyat = element.stok_adet * element.iskontolu_satis_fiyati;
      element.iskontolu_satis_fiyati = element.iskontolu_satis_fiyati + "TL";
      element.toplam_fiyat = Number(element.toplam_fiyat.toFixed(2))
      element.toplam_fiyat = element.toplam_fiyat + " TL"
      if (element.barkod == null) {
        element.barkod = 0;
      }
      delete element.stok_id;
      delete element.iskontolu_satis_fiyati;
      delete element.toplam_fiyat;
      console.log("iskonto", element);

    });
    
    let a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    let csvData = this.ConvertToCSV(this.dataSet);

    a.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvData));
    a.download = this.gelen.fatura_no + '.csv';
    a.click();
  }

  ConvertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = "";
    for (let index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ';';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ';';
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }



  stok_liste_detay_getir() {

    this.authService.postData(this.gelen, "stok_liste_detay_getir")
      .then((result) => {

        this.resposeData = result;

        this.dataSet = this.resposeData.feedData;
        console.log(this.dataSet);

      }, (err) => {
        //Connection failed message
      });


  }
  saatcevir(time) {

    let a = new Date(time * 1000);
    return a;
  }


  kaydet() {



    this.dataSet.forEach(element => {
      console.log(element);

      this.authService.postData(element, "stok_guncelle")
        .then((result) => {
          this.resposeData = result;



        }, (err) => {
          //Connection failed message
        });


    });
    this.showToast2();

  };

  sil() {
    let alert = this.alertCtrl.create({
      title: 'Kayit sil',
      message: 'Silmek istedinizden emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sil',
          handler: () => {

            this.authService
              .postData(this.gelen, "stok_list_sil")
              .then((result) => {
                this.resposeData = result;
                this.showToast();
                this.navCtrl.setRoot(StokListePage);

              }, (err) => {
                //Connection failed message
              });
          }
        }
      ]
    });
    alert.present();


  }

  showToast() {
    let toast = this.toastController.create({
      message: 'Stok Kaydı silindi',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  showToast2() {
    let toast = this.toastController.create({
      message: 'Stok Kaydi Guncellendi',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  yazdir() {

    this.navCtrl.push(ListeGosterPage, { item: this.dataSet, item2: this.gelen });
  }


}
