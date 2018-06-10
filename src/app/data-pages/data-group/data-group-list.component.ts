import { Component, OnInit } from '@angular/core';

import { DatasetService } from '../../data/dataset.service';

@Component({
  selector: 'app-data-group-list',
  templateUrl: './data-group-list.component.html',
  styleUrls: ['./data-group-list.component.scss']
})

export class DataGroupListComponent implements OnInit {

  private datagroups;

  constructor(private datasetService: DatasetService) { }

  init() {
    this.datasetService.getDatasets()
    .then(response => this.datagroups = response);
  }

  ngOnInit() {
    this.init();
  }

}
