import { Component, OnInit } from '@angular/core';

import { DatasetService } from '../data/dataset.service';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})

export class DataPageComponent implements OnInit {

  private datagroups;

  constructor(private datasetService: DatasetService) { }

  init() {
    this.datasetService.getDatasets()
    .then(response => {
      console.log(response);
    });
  }

  ngOnInit() {
    this.init();
  }

}
