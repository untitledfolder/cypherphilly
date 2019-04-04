import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

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
    if (this.link) {
      this.router.navigateByUrl(this.link);
    }
    else if (this.external) {
      window.open(this.external, '_blank');;
    }
  }

  constructor(private router: Router) {}

}
