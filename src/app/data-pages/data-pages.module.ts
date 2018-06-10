import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataModule } from '../data/data.module';
import { ComponentsModule } from '../components/components.module';

import { DataPageComponent } from './data-page.component';
import { DataGroupListComponent } from './data-group/data-group-list.component';
import { DataGroupComponent } from './data-group/data-group.component';
import { DataGroupDetailsComponent } from './data-group/data-group-details.component';
import { DatasetListComponent } from './dataset/dataset-list.component';
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
            component: DataGroupComponent,
            children: [
              {
                path: '',
                component: DataGroupDetailsComponent,
              },
              {
                path: ':setid',
                component: DatasetComponent
              }
            ]
          }
        ]
      }
    ]),
    DataModule,
    ComponentsModule
  ],
  declarations: [
    DataPageComponent,
    DataGroupListComponent,
    DataGroupComponent,
    DataGroupDetailsComponent,
    DatasetListComponent,
    DatasetComponent,
    DataProfileComponent
  ],
  exports: [ ]
})

export class DataPagesModule { }
