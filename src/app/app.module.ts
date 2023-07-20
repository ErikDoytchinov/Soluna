import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe, SearchBarComponent } from './search-bar/search-bar.component';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
