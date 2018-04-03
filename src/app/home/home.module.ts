import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { GetinvolvedComponent } from '../getinvolved/getinvolved.component';
import { SetupComponent } from '../setup/setup.component';

import { MarkdownModule } from 'angular2-markdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'getinvolved',
        component: GetinvolvedComponent
      },
      {
        path: 'setup',
        component: SetupComponent
      }
    ]),
    MarkdownModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    GetinvolvedComponent,
    SetupComponent
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }
