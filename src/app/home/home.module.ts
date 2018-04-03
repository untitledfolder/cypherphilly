import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { MarkdownModule } from 'angular2-markdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    MarkdownModule.forRoot()
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }
