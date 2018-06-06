import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {

  navLinks = [
    {
      label: 'Get Involved',
      link: '/getinvolved'
    },
    {
      label: 'Setup',
      link: '/setup'
    },
    {
      label: 'Data',
      link: '/data'
    }
  ]

  constructor() { }

}
