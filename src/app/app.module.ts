import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { DataModule } from './data/data.module';
import { DataComponent } from './data/data.component';
import { DataService } from './data/data.service';

import { ToolbarModule } from './toolbar/toolbar.module';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'data',
        component: DataComponent
      }
    ]),
    HttpClientModule,
    BrowserAnimationsModule,
    ToolbarModule,
    HomeModule,
    DataModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
