import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfigService } from './config.service';
import { ToolbarModule } from './toolbar/toolbar.module';
import { HomeModule } from './home/home.module';
import { TableModule } from './table/table.module';
import { DatasetsModule } from './datasets/datasets.module';

import { DataService } from './data/data.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '**',
        redirectTo: '/'
      }
    ]),
    HttpClientModule,
    BrowserAnimationsModule,
    ToolbarModule,
    HomeModule,
    TableModule,
    DatasetsModule
  ],
  providers: [
    ConfigService,
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
