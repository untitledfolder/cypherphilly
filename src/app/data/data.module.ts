import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from './data.service';
import { DataComponent } from './data.component';

@NgModule({
  declarations: [
    DataComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DataService
  ],
  exports: [
    DataComponent
  ]
})
export class DataModule { }
