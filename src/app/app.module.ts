import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { MyApp } from "./app.component";
import { AuthService } from "../providers/auth-service";
import { SplitPane } from "../providers/split-pane";
import { Common } from "../providers/common";
import { HttpModule } from "@angular/http";
import { Welcome } from "../pages/welcome/welcome";
import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";

import { UrunDetayPage } from "../pages/urun-detay/urun-detay";
import { StokListeDetayPage } from "../pages/stok-liste-detay/stok-liste-detay";
import { ListeGosterPage } from "../pages/liste-goster/liste-goster";

import { StatusBar } from "@ionic-native/status-bar";

import { SiparisTabsPage } from "../pages/siparis-tabs/siparis-tabs";

import { SiparisUrunDetayPage } from "../pages/siparis-urun-detay/siparis-urun-detay";
import { SiparisListeDetayPage } from "../pages/siparis-liste-detay/siparis-liste-detay";

import { ListeGosterSiparisPage } from "../pages/liste-goster-siparis/liste-goster-siparis";
import { SiparisListeUrunDetayPage } from "../pages/siparis-liste-urun-detay/siparis-liste-urun-detay";

import { MomentModule } from "angular2-moment";
import { LinkyModule } from "angular-linky";
import { stoksepetprovider } from "../providers/stok-sepet-provider";
import { SiparisSepetProvider } from "../providers/siparis-sepet";
import { SiparisSatisPage } from "../pages/siparis-satis/siparis-satis";
import { SiparisListePage } from "../pages/siparis-liste/siparis-liste";
import { SiparisSepetPage } from "../pages/siparis-sepet/siparis-sepet";
import { StokSepetPage } from "../pages/stok-sepet/stok-sepet";
import { StokSayımPage } from "../pages/stok-sayım/stok-sayım";
import { StokListePage } from "../pages/stok-liste/stok-liste";
import { IonicStorageModule } from "@ionic/storage";

import { DenemeePipe} from '../pipes/denemee/denemee';

@NgModule({
  declarations: [
    MyApp,
    Welcome,
    Login,
    Signup,
    HomePage,
    TabsPage,
    SiparisTabsPage,
    UrunDetayPage,
    StokListeDetayPage,
    ListeGosterPage,
    SiparisUrunDetayPage,
    SiparisListeDetayPage,
    ListeGosterSiparisPage,
    SiparisListeUrunDetayPage,
    SiparisSatisPage,
    SiparisListePage,
    SiparisSepetPage,
    StokSepetPage,
    StokSayımPage,
    StokListePage,
    
    DenemeePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    LinkyModule,

    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Welcome,
    Login,
    Signup,
    HomePage,
    TabsPage,
    SiparisTabsPage,
    UrunDetayPage,
    SiparisListeUrunDetayPage,
    StokListeDetayPage,
    ListeGosterPage,
    SiparisUrunDetayPage,
    SiparisListeDetayPage,
    ListeGosterSiparisPage,
    SiparisSatisPage,
    SiparisListePage,
    SiparisSepetPage,
    StokSepetPage,
    StokSayımPage,
    StokListePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    SplitPane,
    Common,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    stoksepetprovider,
    SiparisSepetProvider,
    
    
  ]
})
export class AppModule {}
