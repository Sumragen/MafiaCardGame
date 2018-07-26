import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {PreferencesPageModule} from "./modules/preferences/preferences.module";
import {DistributionPageModule} from "./modules/distribution/distribution.module";
import {StoreModule} from "@ngrx/store";
import {PreferencesEffects} from "./modules/preferences/store/preferences.effects";
import {reducers} from "./store/app.reducers";
import {EffectsModule} from "@ngrx/effects";
import {HomePageModule} from "./modules/home/home.module";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PreferencesEffects]),
    PreferencesPageModule,
    DistributionPageModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
