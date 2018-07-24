import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ErrorService} from "../../shared/services/error.service";
import {DistributionPage} from "../distribution/distribution";
import {RoleEnum} from "../../shared/consts/RoleEnum";
import {Store} from "@ngrx/store";
import {PreferencesState} from "../../shared/interfaces/preferences-state";
import * as PreferencesActions from "./store/preferences.actions";
import {Card} from "../../shared/models/Card"
import * as _ from 'lodash';
import {Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage implements OnInit, OnDestroy {

  public totalPlayerAmount: number;
  public mafiaAmount: number = 1;
  public sheriffEnabled: boolean = true;
  public prostituteEnabled: boolean = true;
  public doctorEnabled: boolean = false;

  public preferences: PreferencesState;

  private _storeChangeSubscription: Subscription;

  constructor(public errorService: ErrorService,
              public navCtrl: NavController,
              private store: Store<{ preferences: PreferencesState }>) {
  }

  ngOnInit() {
    this._storeChangeSubscription = this.store.select('preferences')
      .subscribe((preferences: PreferencesState) => {
        this.preferences = {
          ...preferences
        };
        console.log('new preferences', this.preferences);
      }, (error) => {
        console.log('state error', error);
      });
  }

  ngOnDestroy() {
    this._storeChangeSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencesPage');
  }

  increaseMafiaAmount(): void {
    this.changeCardState(RoleEnum.MAFIA, true);
    // if (this.totalPlayerAmount <= 0) {
    //   this.errorService.show('Sorry, but you still doesn\'t enter total amount of players')
    // } else {
    //   if (this.mafiaAmount < this.totalPlayerAmount - 1 -
    //     this.getBoolCount(this.sheriffEnabled) -
    //     this.getBoolCount(this.doctorEnabled) -
    //     this.getBoolCount(this.prostituteEnabled)) {
    //     // this.changeCardState(RoleEnum.MAFIA, true);
    //   } else {
    //     this.errorService.show('Amount of Mafia couldn\'t be greatest than total amount of players')
    //   }
    // }
  }

  decreaseMafiaAmount(): void {
    this.changeCardState(RoleEnum.MAFIA, false);
    // if (this.totalPlayerAmount <= 0) {
    //   this.errorService.show('Sorry, but you still doesn\'t enter total amount of players')
    // } else {
    //   if (this.mafiaAmount > 1) {
    //     this.changeCardState(RoleEnum.MAFIA, false);
    //   } else {
    //     this.errorService.show('Amount of mafia players must be at least 1');
    //   }
    // }
  }

  shuffle(): void {
    this.navCtrl.setRoot(DistributionPage, {
      roles: {
        [RoleEnum.INNOCENT]: this.totalPlayerAmount -
        this.mafiaAmount -
        this.getBoolCount(this.sheriffEnabled) -
        this.getBoolCount(this.doctorEnabled) -
        this.getBoolCount(this.prostituteEnabled),
        [RoleEnum.MAFIA]: this.mafiaAmount,
        [RoleEnum.SHERIFF]: this.getBoolCount(this.sheriffEnabled),
        [RoleEnum.DOCTOR]: this.getBoolCount(this.doctorEnabled),
        [RoleEnum.PROSTITUTE]: this.getBoolCount(this.prostituteEnabled)
      }
    });
  }

  getMafiaCount(): number {
    return this.getRoleCount(RoleEnum.MAFIA);
  }

  changeSheriffState(): void {
    this.changeCardState(RoleEnum.SHERIFF, this.sheriffEnabled);
  }

  changeProstituteState(): void {
    this.changeCardState(RoleEnum.PROSTITUTE, this.prostituteEnabled);
  }

  changeDoctorState(): void {
    this.changeCardState(RoleEnum.DOCTOR, this.doctorEnabled);
  }

  private changeCardState(role: number, isEnabled: boolean): void {
    if (isEnabled) {
      this.store.dispatch(new PreferencesActions.AddCard(new Card(role)));
    } else {
      this.store.dispatch(new PreferencesActions.RemoveCard(new Card(role)));
    }
  }

  onTotalAmountChange() {
    console.log('onTotalAmountChange');
    this.store.dispatch(new PreferencesActions.ChangeTotalPlayerAmount(this.preferences.total));
  }

  getRoleCount(role: number): number {
    return this.preferences.roles[role];
  }

  private getBoolCount(bool: boolean): number {
    return bool ? 1 : 0
  }
}
