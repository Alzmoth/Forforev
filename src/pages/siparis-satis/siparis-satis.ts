import { Component, Injectable } from '@angular/core';
import { NavController, App, AlertController, Platform, ToastController, Refresher } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { Common } from "../../providers/common";
import { SiparisUrunDetayPage } from '../siparis-urun-detay/siparis-urun-detay'
import { SiparisSepetProvider } from '../../providers/siparis-sepet'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



/**
 * Generated class for the SiparisSatisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Injectable()
@Component({
  selector: "page-siparis-satis",
  templateUrl: "siparis-satis.html"

})

export class SiparisSatisPage {
  public resposeData: any;
  public resposeData2: any;
  public resposeData3: any;
  public dataSet: any[] = [];
  public dataSet1: any[] = [];
  public dataSet2: any[] = [];
  public kategori: any;
  public kategori2: any;
  public userDetails: any;

  queryText: any;
  searchTerm: any;
  secilenKategori: string;
  stokPostData = {
    kategori: "",
    search: "",
    sayac: 0
  };
  userPostData = {
    user_id: "",
    token: ""
  };
  public noRecord: boolean;
  public segment = 'Stoklar';


  constructor(
    public common: Common,
    public navCtrl: NavController,
    public app: App,
    public authService: AuthService,
    public platform: Platform,
    public toastCtrl: ToastController,
    public siparisSepetProvider: SiparisSepetProvider,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.noRecord = false;
  }

  ionViewDidLoad() {

    this.getkategori();
    this.getstok();
    this.getsepet();
    this.segment = 'Stoklar';
  }

  getkategori() {

    this.authService.postData(this.stokPostData, "siparis_kategori").then(
      result => {
        this.resposeData = result;

        this.kategori = this.resposeData.feedData;
        console.log("kategori", this.kategori);
        this.kategori2 = this.kategori;
      },
      err => {
        //Connection failed message
      }
    );




  }

  getstok() {
    this.dataSet.slice;
    this.stokPostData.sayac = 0;
    this.authService.postData(this.stokPostData, "siparis_satis").then(
      result => {
        this.resposeData2 = result;
        this.dataSet = this.resposeData2.feedData;
        console.log(this.dataSet);
      },
      err => {
        //Connection failed message
      }
    );
  }

  doInfinite(): Promise<any> {
    console.log("Begin async operation");

    return new Promise(resolve => {
      setTimeout(() => {
        this.stokPostData.sayac += 50;

        this.authService
          .postData(this.stokPostData, "siparis_satis")
          .then(
            result => {
              this.resposeData2 = result;
              if (this.resposeData2.feedData.length) {
                const newData = this.resposeData2.feedData;
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

  getsepet() {
    this.authService.postData(this.userPostData, "siparis_sepet_getir").then(
      result => {
        this.resposeData3 = result;
        this.dataSet2 = this.resposeData3.feedData;
        console.log(this.dataSet2);
        if (this.dataSet2.length != 0) {
          let alert = this.alertCtrl.create({
            title: "Sepette urun var",
            message: "Sepette run var devam edilsin mi?",
            buttons: [
              {
                text: "Devam Et",
                handler: () => { }
              }
            ]
          });
          alert.present();
          this.siparisSepetProvider.clear();
          this.dataSet2.forEach(element => {
            this.siparisSepetProvider.addToCart(element);
          });
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  public search(queryText) {
    console.log(queryText)
    if (this.queryText.length >= 2) {
      this.stokPostData.search = this.queryText;
      this.getstok();
    } else if (this.queryText.length == 0) {
      this.stokPostData.search = "";
      this.getstok();
    } else {
      this.stokPostData.search = "";
    }
  }


  kat(event, firma) {
    console.log(firma)
    this.stokPostData.kategori = firma.firma_kodu;
    console.log(this.stokPostData);
    this.getstok();
    this.segment = 'Stoklar';
  }

  kattemizle() {
    this.kategori = this.kategori2;
  }

  filterItems(searchTerm) {
    //  this.kattemizle();
    return this.kategori.filter((firma) => {
      return firma.firma_adi.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
  sayac2 = 0;
  setFilteredItems() {

    if (this.searchTerm.length > this.sayac2) {

      this.kategori = this.filterItems(this.searchTerm);
      this.sayac2++;

    } else {
    this.sayac2--;
      this.kattemizle();
    }


  }

  itemTapped(event, urun) {
    this.authService.postData(urun, "detay_katagori").then(
      result => {
        this.resposeData = result;
        this.dataSet1 = this.resposeData.feedData;

        urun.firma_adi = this.dataSet1[0].firma_adi;
        urun.max_iskonto = this.dataSet1[0].max_iskonto;
        urun.sabit_iskonto = (this.dataSet1[0].max_iskonto)/2;
      },
      err => {
        //Connection failed message
      }
    );
    this.getstok();
    this.navCtrl.push(SiparisUrunDetayPage, { item: urun });
  }


  doRefresh(refresher: Refresher) {

    this.stokPostData.kategori = "";
    this.stokPostData.sayac = 0;
    this.stokPostData.search = "";
    this.queryText = "";
    this.getstok();
    // simulate a network request that would take longer
    // than just pulling from out local json file
    setTimeout(() => {
      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Sıfırlandı',
        duration: 1000
      });
      toast.present();
    }, 1000);

  }
}