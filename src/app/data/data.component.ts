import { Component, OnInit } from '@angular/core';

import { IconCardComponent } from '../components/icon-card.component';

import { DataService } from './data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  datasets: [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getDatasets()
    .then(datasets => {
      console.log("Datasets:", datasets);
      this.datasets = datasets;
    });
  }

}
