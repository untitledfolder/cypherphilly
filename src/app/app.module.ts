import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './config.service';
import { DataModule } from './data/data.module';

import { ToolbarModule } from './toolbar/toolbar.module';
import { HomeModule } from './home/home.module';
import { TableModule } from './table/table.module';
import { DataPagesModule } from './data-pages/data-pages.module';

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
    DataModule,
    ToolbarModule,
    HomeModule,
    TableModule,
    DataPagesModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
