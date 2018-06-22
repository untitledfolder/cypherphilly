import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataGroup } from '../../datasets/data-group';

import { DatasetListComponent } from '../dataset/dataset-list.component';

@Component({
  selector: 'app-data-group-details',
  templateUrl: './data-group-details.component.html',
  styleUrls: ['./data-group-details.component.scss']
})

export class DataGroupDetailsComponent implements OnInit {

  private datagroup: DataGroup;

  constructor(private route: ActivatedRoute) { }

  init() {
    this.datagroup = this.route.snapshot.data.datagroup;
  }

  ngOnInit() {
    this.init();
  }

}
