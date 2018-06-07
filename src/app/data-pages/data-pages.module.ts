import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataPageComponent } from './data-page.component';
import { DataGroupComponent } from './data-group/data-group.component';
import { DatasetComponent } from './dataset/dataset.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'data',
        component: DataPageComponent
      },
      {
        path: 'data/groupname',
        component: DataGroupComponent
      },
      {
        path: 'data/groupname/dataset1',
        component: DatasetComponent
      },
      {
        path: 'data/groupname/dataset2',
        component: DatasetComponent
      }
    ])
  ],
  declarations: [
    DataPageComponent,
    DataGroupComponent,
    DatasetComponent
  ],
  exports: [ ]
})

export class DataPagesModule { }
