import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfigService } from './config.service';
import { ToolbarModule } from './toolbar/toolbar.module';
import { HomeModule } from './home/home.module';
import { TableModule } from './table/table.module';

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
    TableModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
