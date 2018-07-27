import { Component } from "@angular/core";
import {  NavParams } from "ionic-angular";
import { SiparisListePage } from "../siparis-liste/siparis-liste";
import { SiparisSepetPage } from "../siparis-sepet/siparis-sepet";
import { SiparisSatisPage } from "../siparis-satis/siparis-satis";

/**
 * Generated class for the SiparisTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: "siparis-tabs.html"
})
export class SiparisTabsPage {
  tab1Root = SiparisSatisPage;
  tab2Root = SiparisSepetPage;
  tab3Root = SiparisListePage;
  mySelectedIndex: number;

  constructor(navParams: NavParams ) {
    this.mySelectedIndex = navParams.get("item");
    console.log("siparis index", this.mySelectedIndex);
 
  }
}
