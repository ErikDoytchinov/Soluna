import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe, SearchBarComponent } from './search-bar/search-bar.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { DatePipe } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SettingsComponent } from './settings/settings.component';
import { AlertComponent } from './alert/alert.component';
import { WeatherMapComponent } from './weather-map/weather-map.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SafeHtmlPipe,
    NavBarComponent,
    HomeScreenComponent,
    SettingsComponent,
    AlertComponent,
    WeatherMapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    LeafletModule,
  ],
  providers: [DatePipe,HomeScreenComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
