import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { StokSayımPage } from '../stok-sayım/stok-sayım'
import { StokSepetPage } from '../stok-sepet/stok-sepet'
import { StokListePage } from '../stok-liste/stok-liste'

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = StokSayımPage;
    tab2Root = StokSepetPage;
    tab3Root = StokListePage;
    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.get('item');
      
        console.log("index", this.mySelectedIndex)
    }
}
