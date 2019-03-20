import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatPaginatorModule } from '@angular/material';

import { TableComponent } from './table-component.component';
import { ImageContentComponent } from './image-content.component';
import { IconCardComponent } from './icon-card.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    TableComponent,
    ImageContentComponent,
    IconCardComponent
  ],
  providers: [ ],
  exports: [
    TableComponent,
    ImageContentComponent,
    IconCardComponent
  ]
})

export class ComponentsModule { }
