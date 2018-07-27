import { Component, ViewChild } from "@angular/core";
import {
  Platform,  App,  MenuController,  Nav,  ToastController} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SplitPane } from "../providers/split-pane";
import { Welcome } from "../pages/welcome/welcome";

import { StokSayımPage } from "../pages/stok-sayım/stok-sayım";
import { TabsPage } from "../pages/tabs/tabs";
import { SiparisTabsPage } from "../pages/siparis-tabs/siparis-tabs";

import { StokListePage } from "../pages/stok-liste/stok-liste";
import { SiparisSatisPage } from "../pages/siparis-satis/siparis-satis";
import { SiparisListePage } from "../pages/siparis-liste/siparis-liste";
import { SiparisSepetPage } from "../pages/siparis-sepet/siparis-sepet";
import { Storage } from "@ionic/storage";
import { AuthService } from "../providers/auth-service";
//import { BackButtonEventHandlerProvider } from "../providers/back-button-event-handler";
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  siparisPages: PageInterface[] = [
    {
      title: "Siparis Olustur",
      name: "SiparisTabsPage",
      component: SiparisTabsPage,
      tabComponent: SiparisSatisPage,
      index: 0,
      icon: "clipboard"
    },
    {
      title: "Sepet",
      name: "SiparisTabsPage",
      component: SiparisTabsPage,
      tabComponent: SiparisSepetPage,
      index: 1,
      icon: "cart"
    },
    {
      title: "Siparis Listesi",
      name: "SiparisTabsPage",
      component: SiparisTabsPage,
      tabComponent: SiparisListePage,
      index: 2,
      icon: "filing"
    }
  ];

  stokPages: PageInterface[] = [
    {
      title: "Stok Sayim",
      name: "TabsPage",
      component: TabsPage,
      tabComponent: StokSayımPage,
      index: 0,
      icon: "md-add"
    },
    {
      title: "Stok Sayim Listesi",
      name: "TabsPage",
      component: TabsPage,
      tabComponent: StokListePage,
      index: 2,
      icon: "ios-archive-outline"
    }
  ];
  rootPage: any;
  public counter = 0;

  public resposeData: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public app: App,
    public toastCtrl: ToastController,
    public splitPane: SplitPane,
    public authService: AuthService,
    public menu: MenuController,
    public storage: Storage,
   // public viewctrl:ViewController,
    //public bt: BackButtonEventHandlerProvider,
  ) {
      this.storage.get("hasSeenTutorial").then(hasSeenTutorial => {
        if (hasSeenTutorial) {
          this.rootPage = SiparisTabsPage;
        } else {
          this.rootPage = Welcome;
        }
        this.platformReady();
      });
    //this.resposeData = viewctrl.pageRef();
    //console.log(this.resposeData);
    }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
    this.splashScreen.hide();
    

       /*this.platform.registerBackButtonAction(() => {
       
      
        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => {
            this.counter = 0;
          }, 2000);
        } else {
          // console.log("exitapp");
          this.platform.exitApp();
        }
        
      }, 0);*/
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    //Api Token Logout

    localStorage.clear();
    this.menu.enable(false);
    setTimeout(() => this.backToWelcome(), 1000);
    this.nav.setRoot(Welcome);
  }
  openPage(page: PageInterface) {
    this.nav.push(page.component, { item: page.index });
    
  }
}
