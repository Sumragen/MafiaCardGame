import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as _ from 'lodash';
import {RoleNames} from "../../../shared/consts/RoleNames";
import {HomePage} from "../home/home";
import {RoleSrcs} from "../../../shared/consts/RoleSrcs";
import {Store} from "@ngrx/store";
import {PreferencesState} from "../../../shared/interfaces/preferences-state";
import {Subscription} from "rxjs";
import {Card} from "../../../shared/models/Card";
import {RoleEnum} from "../../../shared/consts/RoleEnum";

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
  public currentCard: {
    name: string,
    src: string
  };

  private _storeChangeSubscription: Subscription;

  constructor(public navCtrl: NavController,
              private store: Store<{ preferences: PreferencesState }>) {
  }

  ionViewDidLoad() {
    this.shuffle();
  }

  showCard(): void {
    const card = this._cards.pop();
    this.currentCard = {
      name: RoleNames[card.role],
      src: RoleSrcs[card.role]
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
    this._storeChangeSubscription = this.store.select('preferences')
      .subscribe((preferences: PreferencesState) => {
        const innocentsAmount = preferences.total - _.reduce(preferences.roles, (sum: number, role: number) => {
          return sum + role;
        }, 0);

        this._cards = _.concat(this._cards, this.createArrayOfCards(innocentsAmount, RoleEnum.INNOCENT));

        _.each(preferences.roles, (amount: number, role) => {
          this._cards = _.concat(this._cards, this.createArrayOfCards(amount, +role))
        });
      });
    this._cards = _.shuffle(this._cards);
  }

  private createArrayOfCards(howMany: number, role: number): Card[] {
    return _.map(_.range(howMany), () => {
      return new Card(role);
    })
  }
}
