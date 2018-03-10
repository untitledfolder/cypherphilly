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
    this.tableService.getHeaders()
    .subscribe(headers => this.headers = headers);

    this.tableService.getData()
    .subscribe(datas => this.datas = datas);
  }

  ngOnInit() {
    this.getData();
  }

}
