import { Component, Input } from '@angular/core';

import { MatCard } from '@angular/material';

@Component({
  selector: 'icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss']
})

export class IconCardComponent {

  @Input()
  title: string;

  @Input()
  image: string;

  @Input()
  link: string;

  @Input()
  external: string;

  click() {
    console.log("Link:", this.link);
    console.log("External:", this.external);
  }

  constructor() {}

}
