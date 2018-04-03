import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  navLinks = [
    {
      label: 'Get Involved',
      link: '/getinvolved'
    },
    {
      label: 'Setup',
      link: '/setup'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
