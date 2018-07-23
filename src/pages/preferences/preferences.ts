import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ErrorService} from "../../shared/services/error.service";
import {DistributionPage} from "../distribution/distribution";
import {RoleEnum} from "../../shared/consts/RoleEnum";

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {

  public totalPlayerAmount: number = 5;
  public mafiaAmount: number = 1;
  public sheriffEnabled: boolean = true;
  public prostituteEnabled: boolean = true;
  public doctorEnabled: boolean = false;

  constructor(public errorService: ErrorService,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencesPage');
  }

  increaseMafiaAmount(): void {
    if (this.totalPlayerAmount <= 0) {
      this.errorService.show('Sorry, but you still doesn\'t enter total amount of players')
    } else {
      if (this.mafiaAmount < this.totalPlayerAmount - 1 -
        this.getBoolCount(this.sheriffEnabled) -
        this.getBoolCount(this.doctorEnabled) -
        this.getBoolCount(this.prostituteEnabled)) {
        this.mafiaAmount++;
      } else {
        this.errorService.show('Amount of Mafia couldn\'t be greatest than total amount of players')
      }
    }
  }

  decreaseMafiaAmount(): void {
    if (this.totalPlayerAmount <= 0) {
      this.errorService.show('Sorry, but you still doesn\'t enter total amount of players')
    } else {
      if (this.mafiaAmount > 1) {
        this.mafiaAmount--;
      } else {
        this.errorService.show('Amount of mafia players must be at least 1');
      }
    }
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

  private getBoolCount(bool: boolean): number {
    return bool ? 1 : 0
  }
}
