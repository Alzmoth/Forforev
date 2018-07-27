import { Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';


import { Platform } from 'ionic-angular';





@Component({
  selector: 'page-liste-goster',
  templateUrl: 'liste-goster.html',
})
export class ListeGosterPage {

  gelen: any;
  public dataSet: any[] = [];

  saveData: any[] = [];
  public splitPaneState: boolean;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public menu: MenuController


  ) {
    this.splitPaneState = false;

    this.dataSet = navParams.get('item');
    this.gelen = navParams.get('item2');
    console.log("hello", this.gelen)
    this.menu.enable(false);
    setTimeout(() => this.navCtrl.pop(), 7000);
    setTimeout(() => this.menu.enable(true), 7000)


    this.dataSet.forEach(element => {
      delete element.stok_id;
      delete element.fatura_no;
    });
    console.log("ilk hali", this.dataSet)
    // this.extractData();
  }





  ionViewDidLoad() {


  }


}