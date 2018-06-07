import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-group',
  templateUrl: './data-group.component.html',
  styleUrls: ['./data-group.component.scss']
})
export class DataGroupComponent implements OnInit {

  private datagroup;

  constructor() { }

  init() {

    this.datagroup = {
      name: "Group name",
      url: "/groupname",
      datasets: [
        {
          name: "Dataset 1",
          url: "/dataset1"
        },
        {
          name: "Dataset 2",
          url: "/dataset2"
        }
      ]
    };

  }

  ngOnInit() {
    this.init();
  }

}
