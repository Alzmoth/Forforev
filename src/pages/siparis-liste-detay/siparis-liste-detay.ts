import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { SiparisListePage } from '../siparis-liste/siparis-liste'
import { ListeGosterSiparisPage } from '../liste-goster-siparis/liste-goster-siparis'
import { SiparisListeUrunDetayPage } from '../siparis-liste-urun-detay/siparis-liste-urun-detay'
import {SiparisSepetProvider} from '../../providers/siparis-sepet'

import { SiparisTabsPage } from '../siparis-tabs/siparis-tabs';


/**
 * Generated class for the SiparisListeDetayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-siparis-liste-detay',
  templateUrl: 'siparis-liste-detay.html',
})
export class SiparisListeDetayPage {


  saveData: any[] = [];
  resposeData: any;
  gelen: any;
  public fiyat_kaydi= {
    "toplam_fiyat":0,
    "toplam_urun":0,
    "fatura_no":0
  }
  public dataSet: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public authService: AuthService,
    public siparisSepetProvider: SiparisSepetProvider,
    public toastController: ToastController) {

    this.gelen = navParams.get('item');
    //this.gelen.toplam_fiyat=this.gelen.toplam_fiyat*1;

    console.log("gelen", this.gelen)

  }

  ionViewDidLoad() {
   
    this.liste_getir()

    
  }

  //download


  downloadCSV() {

    this.dataSet.forEach(element => {
     
      element.iskontolu_satis_fiyati= element.satis_fiyati - ((element.satis_fiyati/100) * element.sabit_iskonto)
      element.toplam_fiyat = element.stok_adet*element.iskontolu_satis_fiyati;
      element.iskontolu_satis_fiyati=element.iskontolu_satis_fiyati+"TL";
      element.toplam_fiyat= Number(element.toplam_fiyat.toFixed(2))
      element.toplam_fiyat= element.toplam_fiyat+" TL"
      if(element.barkod==null){
        element.barkod=0;
      }
      delete element.stok_id;
      
      console.log("iskonto",element);
     
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

  itemTapped(event, item) {
    console.log(item)
    item.stok_olcu_birim="Adet";
    

    this.navCtrl.push(SiparisListeUrunDetayPage, { item: item });

  }

  liste_getir() {

    this.authService.postData(this.gelen, "siparis_liste_detay_getir")
      .then((result) => {

        this.resposeData = result;

        this.dataSet = this.resposeData.feedData;
        console.log(this.dataSet);

        this.toplamfiyathesapla();
      }, (err) => {
        //Connection failed message
      });
  
   
  }

  saatcevir(time) {

    let a = new Date(time * 1000);
    return a;
  }
  
toplamfiyathesapla(){
  this.fiyat_kaydi.toplam_fiyat = 0;

  this.dataSet.forEach(element => {
    console.log("bu var", element);
    this.fiyat_kaydi.toplam_urun = (this.fiyat_kaydi.toplam_urun * 1) + (element.stok_adet * 1);
    element.iskontolu_satis_fiyati = element.satis_fiyati - ((element.satis_fiyati / 100) * (element.sabit_iskonto));
    this.fiyat_kaydi.fatura_no = element.fatura_no;
    this.fiyat_kaydi.toplam_fiyat = (this.fiyat_kaydi.toplam_fiyat * 1) + ((element.iskontolu_satis_fiyati * 1) * (element.stok_adet * 1))

  });
  }

  kaydet(){

    this.fiyat_kaydi.toplam_fiyat=0;

    this.dataSet.forEach(element => {
      console.log("bu var",element);
      this.fiyat_kaydi.toplam_urun= (this.fiyat_kaydi.toplam_urun*1) + (element.stok_adet*1);
      element.iskontolu_satis_fiyati=element.satis_fiyati - ((element.satis_fiyati/100)*(element.sabit_iskonto) );
      this.fiyat_kaydi.fatura_no = element.fatura_no;
      this.fiyat_kaydi.toplam_fiyat = (this.fiyat_kaydi.toplam_fiyat *1) + ((element.iskontolu_satis_fiyati*1)* (element.stok_adet*1))
      this.authService.postData(element, "siparis_guncelle")
        .then((result) => {
          this.resposeData = result;
          



        }, (err) => {
          //Connection failed message
        });


    });

    
    this.gelen.toplam_fiyat=this.fiyat_kaydi.toplam_fiyat;
    this.gelen.urun_adedi=this.fiyat_kaydi.toplam_urun;
    this.authService.postData(this.fiyat_kaydi, "toplam_fiyat")
      .then((result) => {
        this.resposeData = result;




      }, (err) => {
        //Connection failed message
      });
      this.fiyat_kaydi.toplam_urun=0;
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
              .postData(this.gelen, "siparis_list_sil")
              .then((result) => {
                this.resposeData = result;
                this.showToast();
                this.navCtrl.push(SiparisListePage);

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
    this.dataSet.forEach(element => {

      element.iskontolu_satis_fiyati = element.satis_fiyati - ((element.satis_fiyati / 100) * element.sabit_iskonto)
      element.toplam_fiyat = element.stok_adet * element.iskontolu_satis_fiyati;
      element.iskontolu_satis_fiyati = element.iskontolu_satis_fiyati;
      element.toplam_fiyat = Number(element.toplam_fiyat.toFixed(2))
      element.toplam_fiyat = element.toplam_fiyat + " TL"
      if (element.barkod == null) {
        element.barkod = 0;
      }
      delete element.stok_id;

      console.log("iskonto", element);

    });
   
    this.navCtrl.push(ListeGosterSiparisPage, { item: this.dataSet, item2: this.gelen });
  }
  devamet(){
    this.dataSet.forEach(element => {
      element.kdv_dahil_satis_fiyat= element.satis_fiyati;
      element.urun_adet=element.stok_adet;
    this.siparisSepetProvider.addToCart(element);
      
    });
    this.navCtrl.setRoot(SiparisTabsPage);

  }

}
