import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { NxWelcomeComponent } from '../nx-welcome.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ExploreContainerComponent, NxWelcomeComponent],
  exports: [ExploreContainerComponent],
})
export class ExploreContainerComponentModule {}
