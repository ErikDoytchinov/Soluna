import { HourInfo } from './hour-info';
import { map } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, formatNumber } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DayInfo } from './day-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
   image:string;
   temperature:any;
   location:string;
   time:string;
   date:string;
   feelsLike:any;
   humidity:any;
   uvIndex:any;
   visibility:any;
   wind:any;
   precipitation:any = '∞';
   weather_descriptor:any;

   hour1: HourInfo ={
      time: undefined,
      weather: undefined,
      img: undefined
   }

   hour2: HourInfo ={
      time: undefined,
      weather: undefined,
      img: undefined
   }

   hour3: HourInfo ={
      time: undefined,
      weather: undefined,
      img: undefined
   }

   day1: DayInfo ={
      date: undefined,
      img: undefined,
      min: undefined,
      max: undefined
   }

   day2: DayInfo ={
      date: undefined,
      img: undefined,
      min: undefined,
      max: undefined
   }

   day3: DayInfo ={
      date: undefined,
      img: undefined,
      min: undefined,
      max: undefined
   }

   day4: DayInfo ={
      date: undefined,
      img: undefined,
      min: undefined,
      max: undefined
   }

   day5: DayInfo ={
      date: undefined,
      img: undefined,
      min: undefined,
      max: undefined
   }

   day6: DayInfo ={
      date: undefined,
      img: undefined,
      min: undefined,
      max: undefined
   }
   

   public searchQuery:any = {latidude: 0, longitude: 0};

   constructor(
      private http: HttpClient,
      private datepipe: DatePipe
   ){}

    //on page load will fetchWeatherInfo
   ngOnInit(){
      this.fetchWeatherInfo();
      this.getLocation();
   }

    public fetchWeatherInfo(){
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.searchQuery.latidude}&lon=${this.searchQuery.longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=metric`;
      this.http.get<any>(url,{responseType:'json'})
         .subscribe((response)=> {
            if(response.timezone_offset > 0) {
               this.time = this.datepipe.transform(new Date, 'h:mm a', `GMT+${response.timezone_offset/3600}`);
               this.date = this.datepipe.transform(new Date, 'EEEE',`GMT+${response.timezone_offset/3600}`);
            } else {
               this.time = this.datepipe.transform(new Date, 'h:mm a', `GMT${response.timezone_offset/3600}`);
               this.date = this.datepipe.transform(new Date, 'EEEE', `GMT${response.timezone_offset/3600}`);
            }

            this.temperature = formatNumber(response.current.temp, "en-CA", '1.0-0')
            this.feelsLike = formatNumber(response.current.feels_like, "en-CA", '1.0-0');
            this.humidity = response.current.humidity;
            this.wind = `${response.current.wind_speed}m/s`;
            this.uvIndex = response.current.uvi;
            this.visibility = response.current.visibility;
            if(response.minutely != undefined) {this.precipitation = response.minutely[0].precipitation;}
            this.image = `/assets/icons/${response.current.weather[0].icon}.png`;
            this.weather_descriptor = capital_letter(response.current.weather[0].description);

            //future hour temp
            this.hour1.weather = formatNumber(response.hourly[1].temp, "en-CA", '1.0-0');
            this.hour2.weather = formatNumber(response.hourly[2].temp, "en-CA", '1.0-0');
            this.hour3.weather = formatNumber(response.hourly[3].temp, "en-CA", '1.0-0');

            //future hour time
            if(response.timezone_offset > 0) {
               this.hour1.time = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + 1}`);
               this.hour2.time = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + 2}`);
               this.hour3.time = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + 3}`);
            } else {
               this.hour1.time = this.datepipe.transform(new Date, 'h a', `GMT${(response.timezone_offset/3600) + 1}`);
               this.hour2.time = this.datepipe.transform(new Date, 'h a', `GMT${(response.timezone_offset/3600) + 2}`);
               this.hour3.time = this.datepipe.transform(new Date, 'h a', `GMT${(response.timezone_offset/3600) + 3}`);
            }
            
            //future hour img
            this.hour1.img = `/assets/icons/${response.hourly[1].weather[0].icon}.png`;
            this.hour2.img = `/assets/icons/${response.hourly[2].weather[0].icon}.png`;
            this.hour3.img = `/assets/icons/${response.hourly[3].weather[0].icon}.png`;

            //future day date
            var day = new Date();
            day.setDate(day.getDate() + 1);
            this.day1.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`)
            day.setDate(day.getDate() + 1);
            this.day2.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`)
            day.setDate(day.getDate() + 1);
            this.day3.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`)
            day.setDate(day.getDate() + 1);
            this.day4.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`)
            day.setDate(day.getDate() + 1);
            this.day5.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`)
            day.setDate(day.getDate() + 1);
            this.day6.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`)

            //future day img

            this.day1.img = `/assets/icons/${response.daily[1].weather[0].icon}.png`;
            this.day2.img = `/assets/icons/${response.daily[2].weather[0].icon}.png`;
            this.day3.img = `/assets/icons/${response.daily[3].weather[0].icon}.png`;
            this.day4.img = `/assets/icons/${response.daily[4].weather[0].icon}.png`;
            this.day5.img = `/assets/icons/${response.daily[5].weather[0].icon}.png`;
            this.day6.img = `/assets/icons/${response.daily[6].weather[0].icon}.png`;


            //future day min-max

            this.day1.min = formatNumber(response.daily[1].temp.min, "en-CA", '1.0-0');
            this.day2.min = formatNumber(response.daily[2].temp.min, "en-CA", '1.0-0');
            this.day3.min = formatNumber(response.daily[3].temp.min, "en-CA", '1.0-0');
            this.day4.min = formatNumber(response.daily[4].temp.min, "en-CA", '1.0-0');
            this.day5.min = formatNumber(response.daily[5].temp.min, "en-CA", '1.0-0');
            this.day6.min = formatNumber(response.daily[6].temp.min, "en-CA", '1.0-0');

            this.day1.max = formatNumber(response.daily[1].temp.max, "en-CA", '1.0-0');
            this.day2.max = formatNumber(response.daily[2].temp.max, "en-CA", '1.0-0');
            this.day3.max = formatNumber(response.daily[3].temp.max, "en-CA", '1.0-0');
            this.day4.max = formatNumber(response.daily[4].temp.max, "en-CA", '1.0-0');
            this.day5.max = formatNumber(response.daily[5].temp.max, "en-CA", '1.0-0');
            this.day6.max = formatNumber(response.daily[6].temp.max, "en-CA", '1.0-0');


         })

      const urlName = `https://api.openweathermap.org/data/2.5/weather?lat=${this.searchQuery.latidude}&lon=${this.searchQuery.longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=metric`;
      this.http.get<any>(urlName,{responseType:'json'})
         .subscribe((response)=> {
            this.location = response.name;
        })
  } 
  
  getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition((position: any) => {
       if (position) {
         this.searchQuery.latidude = position.coords.latitude;
         this.searchQuery.longitude = position.coords.longitude;

         this.fetchWeatherInfo();
       }
     },
       (error: any) => console.log(error));
   } else {
     alert("Geolocation is not supported by this browser.");
   }
 }
}

function capital_letter(str) {
   str = str.split(" ");
   for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
   }
   return str.join(" ");
}