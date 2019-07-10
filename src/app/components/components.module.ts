import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageContentComponent } from './image-content.component';
import { TitleTextComponent } from './title-text/title-text.component';
import { ImageTitleTextComponent } from './image-title-text/image-title-text.component';
import { IconCardComponent } from './icon-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImageContentComponent,
    TitleTextComponent,
    ImageTitleTextComponent,
    IconCardComponent
  ],
  providers: [ ],
  exports: [
    ImageContentComponent,
    TitleTextComponent,
    ImageTitleTextComponent,
    IconCardComponent
  ]
})

export class ComponentsModule { }
