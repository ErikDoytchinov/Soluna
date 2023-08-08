import { DatePipe, formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

   constructor(
      private http: HttpClient,
      private datepipe: DatePipe,
   ){ }

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
      },

      alertInfo: undefined,
   }

   public fetchWeatherInfo({latitude = 0, longitude = 0}){
      let measurement: string = "metric";
      let lat, lng: number;
      let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=${measurement}`
      if(localStorage.getItem("measurement") != undefined) {measurement = localStorage.getItem("measurement")}
      this.http.get<any>(url,{responseType:'json'})
         .subscribe((response)=> {
            lat = response.lat;
            lng = response.lon;

            if(response.timezone_offset > 0) {
               this.weatherInfo.time = this.datepipe.transform(new Date, 'h:mm a', `GMT+${response.timezone_offset/3600}`);
               this.weatherInfo.date = this.datepipe.transform(new Date, 'EEEE',`GMT+${response.timezone_offset/3600}`);
            } else {
               this.weatherInfo.time = this.datepipe.transform(new Date, 'h:mm a', `GMT${response.timezone_offset/3600}`);
               this.weatherInfo.date = this.datepipe.transform(new Date, 'EEEE', `GMT${response.timezone_offset/3600}`);
            }

            this.weatherInfo.temperature = formatNumber(response.current.temp, "en-CA", '1.0-0')
            this.weatherInfo.feelsLike = formatNumber(response.current.feels_like, "en-CA", '1.0-0');
            this.weatherInfo.humidity = response.current.humidity;
            this.weatherInfo.wind = `${response.current.wind_speed}`;
            this.weatherInfo.uvIndex = formatNumber(response.current.uvi, "en-CA", '1.0-0');
            this.weatherInfo.visibility = response.current.visibility;
            if(response.minutely != undefined) {this.weatherInfo.precipitation = response.minutely[0].precipitation;}
            this.weatherInfo.image = `/assets/icons/${response.current.weather[0].icon}.png`;
            this.weatherInfo.weather_descriptor = capital_letter(response.current.weather[0].description);

            //future hour setup
            for(let Hour of this.weatherInfo.hourInfo.hour){
               Hour.weather = formatNumber(response.hourly[Hour.id].temp, "en-CA", '1.0-0');

               if(response.timezone_offset > 0) {
                  Hour.time = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + Hour.id}`);
               } else {
                  if(response.timezone_offset/3600 + Hour.id >= 0){
                     Hour.time = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + Hour.id}`);
                  } else {
                     Hour.time = this.datepipe.transform(new Date, 'h a', `GMT${(response.timezone_offset/3600) + Hour.id}`);
                  }

               }

               Hour.img = `/assets/icons/${response.hourly[Hour.id].weather[0].icon}.png`;
            }

            //future day setup
            var day = new Date
            for(let Day of this.weatherInfo.dayInfo.day){
               day.setDate(day.getDate() + 1);
               Day.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`);

               Day.img = `/assets/icons/${response.daily[Day.id].weather[0].icon}.png`;
               Day.min = formatNumber(response.daily[Day.id].temp.min, "en-CA", '1.0-0');
               Day.max = formatNumber(response.daily[Day.id].temp.max, "en-CA", '1.0-0');
               Day.weather = capital_letter(response.daily[Day.id].weather[0].description);
            }

            this.weatherInfo.alertInfo = response.alerts;
         })

      const urlName = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=metric`;
      this.http.get<any>(urlName,{responseType:'json'})
         .subscribe((response)=> {
            this.weatherInfo.location = response.name;
         })

      return this.weatherInfo;
   } 
}

function capital_letter(str) {
   str = str.split(" ");
   for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
   }
   return str.join(" ");
}
