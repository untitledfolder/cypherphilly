import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataModule } from '../data/data.module';

import { DataPageComponent } from './data-page.component';
import { DataGroupComponent } from './data-group/data-group.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DataProfileComponent } from './data-profile/data-profile.component';

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
    ]),
    DataModule
  ],
  declarations: [
    DataPageComponent,
    DataGroupComponent,
    DatasetComponent,
    DataProfileComponent
  ],
  exports: [ ]
})

export class DataPagesModule { }
