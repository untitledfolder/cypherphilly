import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';

import { TablePageComponent } from './table.page.component';
import { TableSectionComponent } from './table.section.component';
import { TableService } from './table.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'table',
        component: TablePageComponent
      }
    ]),
    ComponentsModule
  ],
  declarations: [
    TablePageComponent,
    TableSectionComponent
  ],
  providers: [
    TableService
  ],
  exports: [
    TableSectionComponent
  ]
})

export class TableModule { }
