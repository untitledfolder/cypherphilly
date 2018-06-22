import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasetsService } from './datasets.service';
import { DataGroupService } from './data-group.service';
import { DatasetService } from './dataset.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    DatasetsService,
    DataGroupService,
    DatasetService
  ],
  exports: [
  ]
})

export class DatasetsModule { }
