import { Component, OnInit } from '@angular/core';
import { formatNumber, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from '../data-service.service';
import { Subscription, interval } from 'rxjs';
import * as moment from 'moment';
import { DataFetchService } from '../data-fetch.service';


@Component({
   selector: 'app-home-screen',
   templateUrl: './home-screen.component.html',
   styleUrls: ['./home-screen.component.css']
})

export class HomeScreenComponent implements OnInit{
   mySubscription: Subscription;
   lastUpdate:string = moment().format("h:mm a");
   measurement:string = "metric";

   public searchQuery:any = {latitude: 0, longitude: 0};

   weatherInfo = {
      image: "/assets/icons/01d.png",
      temperature: "loading...",
      location: "loading...",
      time: "loading...",
      date: "loading...",
      feelsLike: "loading...",
      humidity: 0,
      uvIndex: "0",
      visibility: 0,
      wind: "loading...",
      precipitation: "∞",
      weather_descriptor: "loading...",

      hourInfo: {
         hour: [
            {id: 1, time:undefined,weather:undefined,img:undefined},
            {id: 2, time:undefined,weather:undefined,img:undefined},
            {id: 3, time:undefined,weather:undefined,img:undefined},
            {id: 4, time:undefined,weather:undefined,img:undefined},
            {id: 5, time:undefined,weather:undefined,img:undefined},
            {id: 6, time:undefined,weather:undefined,img:undefined},
            {id: 7, time:undefined,weather:undefined,img:undefined},
            {id: 8, time:undefined,weather:undefined,img:undefined},
            {id: 9, time:undefined,weather:undefined,img:undefined},
            {id: 10, time:undefined,weather:undefined,img:undefined},
            {id: 11, time:undefined,weather:undefined,img:undefined},
            {id: 12, time:undefined,weather:undefined,img:undefined},
         ]
      },

      dayInfo: {
         day: [
            {id: 1,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
            {id: 2,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
            {id: 3,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
            {id: 4,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
            {id: 5,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
            {id: 6,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
         ]
      }
   }

   constructor(
      private dataService: DataServiceService,
      private fetchService: DataFetchService
   ){
      this.mySubscription = dataService.newData.subscribe((data) => {
         this.searchQuery = data
         if(this.searchQuery.latitude != undefined){         
            this.updateWebsite();
         } else if(this.searchQuery.current != undefined){
            return;
         } else {
            //this.measurement = data
            localStorage.setItem("measurement", this.measurement);
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

      var element = document.getElementsByClassName('body-class');
      element[0].classList.add("body-class-present");
   }

   ngOnDestroy() {
      this.mySubscription.unsubscribe(); // Unsubscribe Observable
   }

   updateWebsite(){
      this.weatherInfo = this.fetchService.fetchWeatherInfo(this.searchQuery);
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

