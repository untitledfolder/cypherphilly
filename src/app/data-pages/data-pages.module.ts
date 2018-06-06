import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataPageComponent } from './data-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'data',
        component: DataPageComponent
      }
    ])
  ],
  declarations: [
    DataPageComponent
  ],
  exports: [ ]
})

export class DataPagesModule { }
