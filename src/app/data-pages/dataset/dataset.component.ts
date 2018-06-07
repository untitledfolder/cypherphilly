import { Component, OnInit } from '@angular/core';

import { DatasetService } from '../../data/dataset.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})

export class DatasetComponent implements OnInit {

  private datagroup;

  constructor(private datasetService: DatasetService) { }

  init() {
    this.datasetService.getDatasets()
    .then(response => console.log(response));
  }

  ngOnInit() {
    this.init();
  }

}
