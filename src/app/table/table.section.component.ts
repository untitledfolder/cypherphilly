import { Component, Input } from '@angular/core';

import { TableComponent } from '../components/table-component.component';

@Component({
  selector: 'table-section',
  templateUrl: './table.section.component.html',
  styleUrls: ['./table.section.component.scss']
})

export class TableSectionComponent {

  @Input()
  title;

  @Input()
  headers;

  @Input()
  datas;

}
