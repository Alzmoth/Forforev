import { Injectable } from '@angular/core';
import { Urun } from '../entities/urunler'
import { SiparisSepetUrun } from '../entities/siparis-sepet-urun'
import { siparis_sepet_urun } from '../entities/siparis_sepet_list'
import { AuthService } from './auth-service'

@Injectable()
export class SiparisSepetProvider {

  siparissepetUrun: SiparisSepetUrun[];
  public dataSet: any[] = [];
  public dataSet1: any[] = [];
  public userDetails: any;
  public resposeData:any;
  postData: Urun;
  gelen: any;
  userPostData = {
    "user_id": "",
    "token": "",
    "stok_kayit_id": "",
    "aciklama": "",
    urun_adedi: 0,
    toplam_fiyat: 0,
    genel_iskonto:0
  };
  public toplam_urun ={
    "toplam_fiyat":0,
    "toplam_urun_adet":0

  } 
  
  stokPostData = {
    barkod: 0,
    "firma_kodu": "",
    stok_adet: 1,
    "stok_adi": "",
    "stok_kodu": "",
    "fatura_no": ""

  };

  public gelenaciklama: any;

  gelenveri: any;

  constructor(public authService: AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
   
  }

  addToCart(urun: Urun): void {
    console.log(urun)
    var addedItem = siparis_sepet_urun.find(t => t.urun.stok_kodu == urun.stok_kodu);
    if (addedItem) {

      addedItem.urun.stok_adet = (urun.stok_adet * 1);
      console.log("girmemesi gerekiyor" + addedItem.urun.stok_adet)
    }
    else {
      let siparisUrun = new SiparisSepetUrun();
      siparisUrun.urun = urun;
      siparisUrun.urun_toplam_fiyat = (siparisUrun.urun.urun_adet * siparisUrun.urun.kdv_dahil_satis_fiyat)
      this.toplam_urun.toplam_urun_adet= ((this.toplam_urun.toplam_urun_adet)*1 + (siparisUrun.urun.urun_adet)*1);

      this.toplam_urun.toplam_fiyat = this.toplam_urun.toplam_fiyat +
      (siparisUrun.urun_toplam_fiyat - ((siparisUrun.urun_toplam_fiyat/100) * siparisUrun.urun.sabit_iskonto));
      
      siparis_sepet_urun.push(siparisUrun);
      console.log("ilk kez" + siparisUrun);


    }
  }

  list(): SiparisSepetUrun[] {
    return siparis_sepet_urun;
  }

  toplam() {
    return this.toplam_urun;
  } 

  clear() {
    siparis_sepet_urun.splice(0, siparis_sepet_urun.length);
    this.authService
      .postData(this.userPostData, "siparis_sepet_sil")
      .then((result) => {
        this.resposeData = result;
        
      }, (err) => {
        //Connection failed message
      });

  }

  removeFromCart(urun: Urun) {
    var addedItem = siparis_sepet_urun.find(t => t.urun.stok_kodu == urun.stok_kodu);
    var indexNo = siparis_sepet_urun.indexOf(addedItem);
    if (indexNo != -1) {
      siparis_sepet_urun.splice(indexNo, 1);
    }
  }
  stokkayit(gelen) {
    this.userPostData.toplam_fiyat= this.toplam_urun.toplam_fiyat;
    this.userPostData.urun_adedi=this.toplam_urun.toplam_urun_adet;
    this.userPostData.aciklama = gelen;
    console.log(this.userPostData);
    this.authService
      .postData(this.userPostData, "siparis_fatura_kayit")//fatura ive isim kaydediliyor ve fatura no çagırılıyor ve kullanılıyor
      .then((result) => {
        this.gelenveri = result;
        this.dataSet = this.gelenveri.feedData;




        for (var index = 0; index < siparis_sepet_urun.length; index++) {
          var element = siparis_sepet_urun[index];
          element.urun.fatura_no = this.gelenveri.feedData.fatura_no;
       
          console.log(element)
          this.authService.postData(element.urun, "siparis_kayit").then((result) => {
            this.gelen = result;
            this.dataSet = this.gelen.feedData;

            this.stokPostData.fatura_no = "";

          });

        }
        this.clear();


      }, (err) => {
        //Connection failed message
      });



  }
  urunkaydet() {



    // urunler faturaid ye geri veritabanına kaydediliyor


  }

}
