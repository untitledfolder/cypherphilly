import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatPaginatorModule } from '@angular/material';

import { TableComponent } from './table-component.component';
import { ImageContentComponent } from './image-content.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    TableComponent,
    ImageContentComponent
  ],
  providers: [ ],
  exports: [
    TableComponent,
    ImageContentComponent
  ]
})

export class ComponentsModule { }
