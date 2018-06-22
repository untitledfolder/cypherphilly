import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataGroup } from '../../datasets/data-group';

@Component({
  selector: 'app-data-group-list',
  templateUrl: './data-group-list.component.html',
  styleUrls: ['./data-group-list.component.scss']
})

export class DataGroupListComponent implements OnInit {

  private datagroups: DataGroup[];

  constructor(private route: ActivatedRoute) { }

  init() {
    this.datagroups = this.route.snapshot.data.datagroups;
  }

  ngOnInit() {
    this.init();
  }

}
