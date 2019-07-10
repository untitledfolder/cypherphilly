import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-responsive.component.scss']
})
export class HeaderComponent {

  @Input()
  title: string;

  @Input()
  logo: string

  constructor() { }

}
