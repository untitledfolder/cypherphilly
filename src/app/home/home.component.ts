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

  learnMoreCards: any;

  constructor() {
    this.mainContentImageUrl = "/content/Cypher_Philly_Unification_Color.png";
    this.mainContentTitle = "The Cypher Philly Initiative";
    this.mainContentText = `The Cypher Philly Initiative is an open source web application project designed to empower citizens, journalists, data scientists, coders and creatives with the ability to harness open data for civic good.

        Our goal is to simplify the process of telling data-driven stories using open public data to bring about actionable change, while also informing citizens and governments alike. We plan to collaborate with news organizations to publish our results to the greater Philadelphia community.`;

    this.learnMoreCards = [
      {
        title: "The Cypher Philly Data Stories",
        image: "/content/icons/Cypher_Philly_logo_white_Blackborder.png"
      },
      {
        title: "Lenfest Grant Award",
        image: "/content/icons/Lenfest_Logo.png"
      },
      {
        title: "Philly Data Graphs 4 Good",
        image: "/content/icons/Philly_Data_Graphs_For_Good_Logo.png"
      },
      {
        title: "Philly Graph DB Meetup Group",
        image: "/content/icons/Philly_Graph_Logo_Nodes_Final.png"
      }
    ];
  }

  ngOnInit() {
  }

}
