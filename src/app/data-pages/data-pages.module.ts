import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataPageComponent } from './data-page.component';
import { DataGroupComponent } from './data-group/data-group.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'data/groupname',
        component: DataGroupComponent
      },
      {
        path: 'data',
        component: DataPageComponent
      }
    ])
  ],
  declarations: [
    DataPageComponent,
    DataGroupComponent
  ],
  exports: [ ]
})

export class DataPagesModule { }
