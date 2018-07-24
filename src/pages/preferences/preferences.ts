import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ErrorService} from "../../shared/services/error.service";
import {DistributionPage} from "../distribution/distribution";
import {RoleEnum} from "../../shared/consts/RoleEnum";
import {Store} from "@ngrx/store";
import {PreferencesState} from "../../shared/interfaces/preferences-state";
import * as PreferencesActions from "./store/preferences.actions";
import {Card} from "../../shared/models/Card"
import {Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage implements OnInit, OnDestroy {

  public sheriffEnabled: boolean;
  public prostituteEnabled: boolean;
  public doctorEnabled: boolean;

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

        this.sheriffEnabled = this.isSheriffEnabled();
        this.prostituteEnabled = this.isProstituteEnabled();
        this.doctorEnabled = this.isDoctorEnabled();
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
  }

  decreaseMafiaAmount(): void {
    this.changeCardState(RoleEnum.MAFIA, false);
  }

  shuffle(): void {
    this.navCtrl.setRoot(DistributionPage);
  }

  isSheriffEnabled(): boolean {
    return !!this.getRoleCount(RoleEnum.SHERIFF);
  }

  isDoctorEnabled(): boolean {
    return !!this.getRoleCount(RoleEnum.DOCTOR);
  }

  isProstituteEnabled(): boolean {
    return !!this.getRoleCount(RoleEnum.PROSTITUTE);
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

}
