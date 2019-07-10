import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { TitleTextComponent } from '../title-text/title-text.component';

@Component({
  selector: 'image-title-text',
  templateUrl: './image-title-text.component.html',
  styleUrls: ['./image-title-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageTitleTextComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  text: string;

  @Input()
  image: string;

  constructor() { }

  ngOnInit() {
  }

}
