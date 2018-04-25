import { Component, OnInit, Input } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
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
