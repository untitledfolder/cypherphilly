import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataModule } from '../data/data.module';

import { DataPageComponent } from './data-page.component';
import { DataGroupListComponent } from './data-group-list.component';
import { DataGroupComponent } from './data-group/data-group.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DataProfileComponent } from './data-profile/data-profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'data',
        component: DataPageComponent,
        children: [
          {
            path: '',
            component: DataGroupListComponent
          },
          {
            path: ':groupid',
            component: DataGroupComponent
          },
          {
            path: ':groupid/:datasetid',
            component: DatasetComponent
          }
        ]
      }
    ]),
    DataModule
  ],
  declarations: [
    DataPageComponent,
    DataGroupListComponent,
    DataGroupComponent,
    DatasetComponent,
    DataProfileComponent
  ],
  exports: [ ]
})

export class DataPagesModule { }
