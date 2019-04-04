import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DatasetsComponent } from './datasets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{
      path: 'data',
      component: DatasetsComponent
    }])
  ],
  declarations: [
    DatasetsComponent
  ],
  providers: [ ],
  exports: [
    DatasetsComponent
  ]
})

export class DatasetsModule { }
