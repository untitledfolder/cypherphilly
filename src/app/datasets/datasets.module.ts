import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PpcComponent } from './ppc/ppc.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'ppc',
        component: PpcComponent
      }
    ])
  ],
  declarations: [
    PpcComponent
  ],
  providers: [ ],
  exports: [
  ]
})

export class DatasetsModule { }
