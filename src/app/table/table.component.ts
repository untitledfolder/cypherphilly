import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  headers = [
    "cartodb_id",
    "cap_number",
    "date_received",
    "dist_occurrence",
    "general_cap_classification",
    "summary"
  ]

  datas = [
    {
      cartodb_id: "1",
      the_geom: null,
      the_geom_webmercator: null,
      cap_number: "13-" + Math.round(9999 * Math.random() + 1),
      date_received: new Date(),
      dist_occurrence: "" + Math.round(250 * Math.random() + 1),
      general_cap_classification: "NOPE",
      summary: "Not cool"
    },
    {
      cartodb_id: "2",
      the_geom: null,
      the_geom_webmercator: null,
      cap_number: "13-" + Math.round(9999 * Math.random() + 1),
      date_received: new Date(),
      dist_occurrence: "" + Math.round(250 * Math.random() + 1),
      general_cap_classification: "NOPE",
      summary: "Uhm"
    },
    {
      cartodb_id: "3",
      the_geom: null,
      the_geom_webmercator: null,
      cap_number: "13-" + Math.round(9999 * Math.random() + 1),
      date_received: new Date(),
      dist_occurrence: "" + Math.round(250 * Math.random() + 1),
      general_cap_classification: "NOPE",
      summary: "Really?"
    },
    {
      cartodb_id: "4",
      the_geom: null,
      the_geom_webmercator: null,
      cap_number: "13-" + Math.round(9999 * Math.random() + 1),
      date_received: new Date(),
      dist_occurrence: "" + Math.round(250 * Math.random() + 1),
      general_cap_classification: "NOPE",
      summary: "Come on!"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
