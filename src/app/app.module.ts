import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: '**',
        redirectTo: '/'
      }
    ]),
    ToolbarModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
