import { Component, OnInit, Input } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  @Input()
  headers;

  @Input()
  datas;

  constructor() { }

  ngOnInit() {
  }

}
