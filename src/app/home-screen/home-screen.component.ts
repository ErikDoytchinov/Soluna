import { Component, OnInit } from '@angular/core';
import { formatNumber, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from '../data-service.service';
import { Subscription, interval } from 'rxjs';
import * as moment from 'moment';
import { DataFetchService, WeatherInfo } from '../data-fetch.service';


@Component({
   selector: 'app-home-screen',
   templateUrl: './home-screen.component.html',
   styleUrls: ['./home-screen.component.css']
})

export class HomeScreenComponent implements OnInit{
   mySubscription: Subscription;
   lastUpdate:string = moment().format("h:mm a");
   measurement:string = "metric";

   private searchQuery:any = {latitude: 0, longitude: 0};
   public weatherInfo: WeatherInfo;

   constructor(
      private dataService: DataServiceService,
      private fetchService: DataFetchService,
   ){
      this.mySubscription = dataService.newData.subscribe((data) => {
         this.searchQuery = data
         if(this.searchQuery.latitude != undefined){         
            this.updateWebsite();
         } else if(this.searchQuery.current != undefined){
            return;
         }
      });

      this.mySubscription= interval(600000).subscribe((x =>{
         this.lastUpdate = moment().format("h:mm a");
         this.updateWebsite();
      }));
   }

   //on page load will fetchWeatherInfo
   ngOnInit(){
      this.getLocation();

      this.weatherInfo = this.fetchService.weatherInfo;
      var element = document.getElementsByClassName('body-class');
      element[0].classList.add("body-class-present");
   }

   ngOnDestroy() {
      this.mySubscription.unsubscribe(); // Unsubscribe Observable
   }

   async updateWebsite(){
      this.measurement = localStorage.getItem("measurement");
      this.fetchService.fetchWeatherInfo(this.searchQuery);      
   }
  
   getLocation() {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
         if (position) {
            this.searchQuery.latitude = position.coords.latitude;
            this.searchQuery.longitude = position.coords.longitude;

            this.updateWebsite();
         }
      },
         (error: any) => console.log(error));
      } else {
         alert("Geolocation is not supported by this browser.");
      }
   }
}

