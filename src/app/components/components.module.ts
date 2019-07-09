import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageContentComponent } from './image-content.component';
import { IconCardComponent } from './icon-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImageContentComponent,
    IconCardComponent
  ],
  providers: [ ],
  exports: [
    ImageContentComponent,
    IconCardComponent
  ]
})

export class ComponentsModule { }
