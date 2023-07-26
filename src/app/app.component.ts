import { map } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, formatNumber } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
   title:string = "Soluna"
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

   hourInfo = {
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
         {id: 13, time:undefined,weather:undefined,img:undefined},
         {id: 14, time:undefined,weather:undefined,img:undefined},
         {id: 15, time:undefined,weather:undefined,img:undefined},
         {id: 16, time:undefined,weather:undefined,img:undefined},
         {id: 17, time:undefined,weather:undefined,img:undefined},
         {id: 18, time:undefined,weather:undefined,img:undefined},
         {id: 19, time:undefined,weather:undefined,img:undefined},
         {id: 20, time:undefined,weather:undefined,img:undefined},
         {id: 21, time:undefined,weather:undefined,img:undefined},
         {id: 22, time:undefined,weather:undefined,img:undefined},
         {id: 23, time:undefined,weather:undefined,img:undefined},
      ]
   }

   dayInfo = {
      day: [
         {id: 1,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
         {id: 2,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
         {id: 3,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
         {id: 4,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
         {id: 5,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
         {id: 6,date:undefined,img:undefined,min:undefined,max:undefined,weather:undefined},
      ]
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

            //future hour setup
            for(let Hour of this.hourInfo.hour){
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
            for(let Day of this.dayInfo.day){
               day.setDate(day.getDate() + 1);
               Day.date = this.datepipe.transform(day, 'EEEE', `GMT+${response.timezone_offset/3600}`);

               Day.img = `/assets/icons/${response.daily[Day.id].weather[0].icon}.png`;
               Day.min = formatNumber(response.daily[Day.id].temp.min, "en-CA", '1.0-0');
               Day.max = formatNumber(response.daily[Day.id].temp.max, "en-CA", '1.0-0');
               Day.weather = capital_letter(response.daily[Day.id].weather[0].description);
            }
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