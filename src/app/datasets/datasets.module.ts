import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PpcService } from './ppc/ppc.service';
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
  providers: [
    PpcService
  ],
  exports: [
  ]
})

export class DatasetsModule { }
