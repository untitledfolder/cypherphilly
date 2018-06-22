import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dataset } from '../../datasets/dataset';
import { DataService } from '../../data/data.service';

import { TableComponent } from '../../components/table-component.component';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})

export class DatasetComponent implements OnInit {

  private dataset: Dataset;
  private data: any = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  init() {
    this.dataset = this.route.snapshot.data.dataset;

    this.dataService.getData(
      '/' + this.route.snapshot.parent.data.datagroup.key +
      '/' + this.route.snapshot.data.dataset.key
    )
    .then(response => this.data = response);
  }

  ngOnInit() {
    this.init();
  }

}
