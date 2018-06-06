import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})

export class DataPageComponent implements OnInit {

  private datagroups;

  constructor() { }

  init() {
    this.datagroups = [{
      name: 'Group Name',
      link: '/groupname'
    }];
  }

  ngOnInit() {
    this.init();
  }

}
