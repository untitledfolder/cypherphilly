import { Component, Input } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})

export class TableComponent {

  private headerKeys;

  private _headers;

  @Input()
  set headers(headers) {
    if (headers && headers.length) {
      this.headerKeys = headers.map( header => header.key );
      this._headers = headers;
    }

    console.log("Header Keys:", this.headerKeys);
  }

  get headers() {
    return this._headers;
  }

  @Input()
  datas;

}
