import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss']
})

export class DatasetListComponent {

  @Input()
  datagroup = {};

  constructor() { }

}
