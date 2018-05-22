import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatPaginatorModule } from '@angular/material';

import { TableComponent } from './table-component.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    TableComponent
  ],
  providers: [ ],
  exports: [
    TableComponent
  ]
})

export class ComponentsModule { }
