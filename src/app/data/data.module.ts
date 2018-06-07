import { NgModule } from '@angular/core';

import { DataService } from './data.service';
import { DatasetService } from './dataset.service';

@NgModule({
  providers: [
    DataService,
    DatasetService
  ]
})

export class DataModule { }
