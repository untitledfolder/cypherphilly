import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatasetService } from '../../data/dataset.service';

@Component({
  selector: 'app-data-group',
  templateUrl: './data-group.component.html',
  styleUrls: ['./data-group.component.scss']
})

export class DataGroupComponent implements OnInit {

  private datagroup = {};

  constructor(
    private route: ActivatedRoute,
    private datasetService: DatasetService
  ) { }

  init() {
    this.datasetService.getDatasets()
    .then(response => {
      this.datagroup = response
      .filter(
        group => this.route.snapshot.paramMap.get('groupid') === group.key
      )[0];

      console.log("Datagroup:", this.datagroup);
    });
  }

  ngOnInit() {
    this.init();
  }

}
