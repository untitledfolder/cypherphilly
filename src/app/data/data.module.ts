import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';

import { DataService } from './data.service';
import { DataComponent } from './data.component';

@NgModule({
  declarations: [
    DataComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  providers: [
    DataService
  ],
  exports: [
    DataComponent
  ]
})
export class DataModule { }
