import { Component } from '@angular/core';

@Component({
  selector: 'image-content',
  templateUrl: './image-content.component.html',
  styleUrls: ['./image-content.component.scss']
})

export class ImageContentComponent {

  title: string;
  text: string;
  imageUrl: string;

  constructor() {
    this.title = "TITLE!";
    this.text = "TEXT!";
    this.imageUrl = "https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg";
  }

}
