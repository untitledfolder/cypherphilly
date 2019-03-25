import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-content',
  templateUrl: './image-content.component.html',
  styleUrls: ['./image-content.component.scss']
})

export class ImageContentComponent {

  @Input()
  title: string;

  @Input()
  text: string;

  @Input()
  imageUrl: string;

  constructor() {}

}
