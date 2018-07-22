import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferencesPage } from './preferences';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    PreferencesPage,
  ],
  entryComponents: [
    PreferencesPage
  ],
  imports: [
    IonicPageModule.forChild(PreferencesPage),
    SharedModule
  ],
})
export class PreferencesPageModule {}
