import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TableComponent } from '../../components/table-component.component';

import { DataService } from '../../data/data.service';
import { DatasetService } from '../../data/dataset.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})

export class DatasetComponent implements OnInit {

  private datagroup: any = {};
  private dataset: any = {};
  private data: any = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private datasetService: DatasetService
  ) { }

  init() {
    this.datasetService.getDatasets()
    .then(response => {
      this.datagroup = response
      .filter(
        group => this.route.parent.snapshot.paramMap.get('groupid') === group.key
      )[0];

      this.dataset = this.datagroup.datasets
      .filter(
        set => this.route.snapshot.paramMap.get('setid') === set.key
      )[0];

      return this.dataService.getData(
        '/' + this.datagroup.key + '/' + this.dataset.key
      );
    })
    .then(response => {
      console.log("Response:", response);
      this.data = response
    });
  }

  ngOnInit() {
    this.init();
  }

}
