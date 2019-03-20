import { Component, OnInit } from '@angular/core';

import { ImageContentComponent } from '../components/image-content.component';
import { IconCardComponent } from '../components/icon-card.component';

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
    this.mainContentImageUrl = "/content/Cypher_Philly_Unification_Color.png";
    this.mainContentTitle = "The Cypher Philly Initiative";
    this.mainContentText = `The Cypher Philly Initiative is an open source web application project designed to empower citizens, journalists, data scientists, coders and creatives with the ability to harness open data for civic good.

        Our goal is to simplify the process of telling data-driven stories using open public data to bring about actionable change, while also informing citizens and governments alike. We plan to collaborate with news organizations to publish our results to the greater Philadelphia community.`;
  }

  ngOnInit() {
  }

}
