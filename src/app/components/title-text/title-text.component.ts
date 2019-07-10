import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'title-text',
  templateUrl: './title-text.component.html',
  styleUrls: ['./title-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TitleTextComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  text: string;

  constructor() { }

  ngOnInit() {
  }

}
