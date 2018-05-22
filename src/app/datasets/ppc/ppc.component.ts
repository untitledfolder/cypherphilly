import { Component, OnInit } from '@angular/core';

import { HeaderItem, DataConfig } from '../../data/data-config';

import { PpcService } from './ppc.service';

@Component({
  selector: 'app-ppc',
  templateUrl: './ppc.component.html',
  styleUrls: ['./ppc.component.scss']
})
export class PpcComponent implements DataConfig {

  title: string
  headers: HeaderItem[]
  datas: any

  constructor(private data: PpcService) {
    this.title = "Philadelphia Police Complaints";

    this.headers = [
      {
        title: "ID",
        key: "cartodb_id"
      },
      {
        title: "CAP Number",
        key: "cap_number"
      },
      {
        title: "Received",
        key: "date_received"
      },
      {
        title: "Distance",
        key: "dist_occurrence"
      },
      {
        title: "Classification",
        key: "general_cap_classification"
      },
      {
        title: "Summary",
        key: "summary"
      }
    ];

  }

  ngOnInit() {
    this.data.getData()
    .then( datas => this.datas = datas );
  }

}
