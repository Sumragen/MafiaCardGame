import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PreferencesPage} from "../preferences/preferences";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  play(): void {
    this.navCtrl.push(PreferencesPage);
  }

}
