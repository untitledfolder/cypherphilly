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

  constructor() {}

}
