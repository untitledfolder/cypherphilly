import { Component, OnInit } from '@angular/core';

import { TableComponent } from './table.component';
import { TableService } from './table.service';

@Component({
  selector: 'app-table.page',
  templateUrl: './table.page.component.html',
  styleUrls: ['./table.page.component.scss']
})

export class TablePageComponent implements OnInit {

  headers;

  datas;

  constructor(private tableService: TableService) { }

  getData() {
    this.headers = this.tableService.getHeaders();
    this.datas = this.tableService.getData();
  }

  ngOnInit() {
    this.getData();
  }

}
