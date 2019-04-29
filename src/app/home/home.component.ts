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
  getInvolvedCards: any;

  constructor() {
    this.mainContentImageUrl = "/content/Cypher_Philly_Unification_Color.png";
    this.mainContentTitle = "Empowering Data Journalism";
    this.mainContentText = `The Cypher Philly Initiative is an open source web application project designed to empower citizens, journalists, data scientists, coders and creatives with the ability to harness open data for civic good.

        Our goal is to simplify the process of telling data-driven stories using open public data to bring about actionable change, while also informing citizens and governments alike. We plan to collaborate with news organizations to publish our results to the greater Philadelphia community.`;

    this.learnMoreCards = [
      /*
      {
        title: "The Cypher Philly Data Stories",
        image: "/content/icons/Cypher_Philly_logo_white_Blackborder.png",
        link: "/data"
      },
      */
      {
        title: "Lenfest Grant Award",
        image: "/content/icons/Lenfest_Logo.png",
        external: "https://www.lenfestinstitute.org/team/the-cypher-philly-initiative/"
      },
      {
        title: "Philly Data Graphs 4 Good",
        image: "/content/icons/Philly_Data_Graphs_For_Good_Logo.png",
        external: "https://docs.google.com/document/d/1HmQOetTtHpLJUjcdsfPROrJByk5kyVTXMfeeImtkNN8/edit?usp=sharing"
      },
      {
        title: "Philly Graph DB Meetup Group",
        image: "/content/icons/Philly_Graph_Logo_Nodes_Final.png",
        external: "https://www.meetup.com/Philly-GraphDB/"
      }
    ];

    this.getInvolvedCards = [
      {
        title: "For Civic Activists",
        image: "/content/icons/Cypher_Philly_Unification_Civic_Activists.png",
        external: "https://docs.google.com/forms/d/e/1FAIpQLSdKqTnUG_hmwmpczj0WjvWHQygPIFqvAZboY-jGmoXv8RqhRA/viewform?usp=sf_link"
      },
      {
        title: "For Journlists",
        image: "/content/icons/Cypher_Philly_Unification_Journalists.png",
        external: "https://docs.google.com/forms/d/e/1FAIpQLScHrm7FR-i7PGvsgJLxXayfds5T9596ChtDianhlJ-RMfNg8g/viewform?usp=sf_link"
      },
      {
        title: "For Data Scientists",
        image: "/content/icons/Cypher_Philly_Unification_Datascientists.png",
        external: "https://goo.gl/forms/ntis7bY1kKaCnqdx1"
      },
      {
        title: "For Coders & Creatives",
        image: "/content/icons/Cypher_Philly_Unification_Coders_Creatives.png",
        external: "https://github.com/untitledfolder/cypherphilly"
      }
    ];
  }

  ngOnInit() {
  }

}
