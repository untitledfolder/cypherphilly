import { Component, OnInit } from '@angular/core';

import { ImageContentComponent } from '../components/image-content.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  mainContentImageUrl: string;
  mainContentTitle: string;
  mainContentText: string;

  constructor() {
    this.mainContentImageUrl = "https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg";
    this.mainContentTitle = "TITLE!!";
    this.mainContentText = "TEXT!!";
  }

  ngOnInit() {
  }

}
