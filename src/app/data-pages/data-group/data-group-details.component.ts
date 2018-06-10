import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatasetService } from '../../data/dataset.service';

import { DatasetListComponent } from '../dataset/dataset-list.component';

@Component({
  selector: 'app-data-group-details',
  templateUrl: './data-group-details.component.html',
  styleUrls: ['./data-group-details.component.scss']
})

export class DataGroupDetailsComponent implements OnInit {

  private datagroup = {};

  constructor(
    private route: ActivatedRoute,
    private datasetService: DatasetService
  ) { }

  init() {
    console.log(this.route);
    this.datasetService.getDatasets()
    .then(response => {
      this.datagroup = response
      .filter(
        group => this.route.snapshot.paramMap.get('groupid') === group.key
      )[0];
    });
  }

  ngOnInit() {
    this.init();
  }

}
