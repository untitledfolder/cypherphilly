import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-profile',
  templateUrl: './data-profile.component.html',
  styleUrls: ['./data-profile.component.scss']
})

export class DataProfileComponent {

  @Input()
  private description: string;

  constructor() { }

}
