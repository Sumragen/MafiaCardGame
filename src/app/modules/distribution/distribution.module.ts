import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributionPage } from './distribution';

@NgModule({
  declarations: [
    DistributionPage,
  ],
  entryComponents: [
    DistributionPage
  ],
  imports: [
    IonicPageModule.forChild(DistributionPage),
  ],
})
export class DistributionPageModule {}
