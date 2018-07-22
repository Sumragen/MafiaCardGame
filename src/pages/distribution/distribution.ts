import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as _ from 'lodash';
import {RoleNames} from "../../shared/consts/RoleNames";
import {HomePage} from "../home/home";
import {RoleSrcs} from "../../shared/consts/RoleSrcs";

/**
 * Generated class for the DistributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distribution',
  templateUrl: 'distribution.html',
})
export class DistributionPage {

  private _cards: any[] = [];
  private _availableRoles: {
    innocent: number,
    mafia: number,
    sheriff: number,
    prostitute: number,
    doctor: number
  };
  public currentCard: {
    name: string,
    src: string
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistributionPage');
    this._availableRoles = this.navParams.get('roles');
    this.shuffle();
  }

  showCard(): void {
    const key = this._cards.pop();
    this.currentCard = {
      name: RoleNames[key],
      src: RoleSrcs[key]
    };
  }

  hideCard(): void {
    this.currentCard = null;
  }

  isCardsAvailable(): boolean {
    return !!this._cards && this._cards.length > 0 || !!this.currentCard;
  }

  resetGame(): void {
    this.navCtrl.setRoot(HomePage);
  }

  private shuffle(): void {
    _.each(_.keys(this._availableRoles), (role) => {
      if (this._availableRoles[role] > 0) {
        _.times(this._availableRoles[role], () => {
          this._cards.push(role);
        })
      }
    });
    this._cards = _.shuffle(this._cards);
  }
}
