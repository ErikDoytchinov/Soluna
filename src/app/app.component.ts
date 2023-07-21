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

    future_time1:any;
    future_time2:any;
    future_time3:any; 

    future_temp1:any;
    future_temp2:any;
    future_temp3:any; 

    future_img1:any;
    future_img2:any;
    future_img3:any; 
    searchQuery:any = {latidude: 0, longitude: 0};

    constructor(
        private http: HttpClient,
        private datepipe: DatePipe
    ){}

    //on page load will fetchWeatherInfo
    ngOnInit(){
        this.fetchWeatherInfo();
    }

    public fetchWeatherInfo(){
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.searchQuery.latidude}&lon=${this.searchQuery.longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=metric`;
      this.http.get<any>(url,{responseType:'json'})
         .subscribe((response)=> {
            console.log(response);

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

            //future temp
            this.future_temp1 = formatNumber(response.hourly[1].temp, "en-CA", '1.0-0');
            this.future_temp2 = formatNumber(response.hourly[2].temp, "en-CA", '1.0-0');
            this.future_temp3 = formatNumber(response.hourly[3].temp, "en-CA", '1.0-0');

            //future time
            if(response.timezone_offset > 0) {
               this.future_time1 = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + 1}`);
               this.future_time2 = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + 2}`);
               this.future_time3 = this.datepipe.transform(new Date, 'h a', `GMT+${(response.timezone_offset/3600) + 3}`);
            } else {
               this.future_time1 = this.datepipe.transform(new Date, 'h a', `GMT${(response.timezone_offset/3600) + 1}`);
               this.future_time2 = this.datepipe.transform(new Date, 'h a', `GMT${(response.timezone_offset/3600) + 2}`);
               this.future_time3 = this.datepipe.transform(new Date, 'h a', `GMT${(response.timezone_offset/3600) + 3}`);
            }
            
            //future img
            this.future_img1 = `/assets/icons/${response.hourly[1].weather[0].icon}.png`;
            this.future_img2 = `/assets/icons/${response.hourly[2].weather[0].icon}.png`;
            this.future_img3 = `/assets/icons/${response.hourly[3].weather[0].icon}.png`;

         })

      const urlName = `https://api.openweathermap.org/data/2.5/weather?lat=${this.searchQuery.latidude}&lon=${this.searchQuery.longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=metric`;
      this.http.get<any>(urlName,{responseType:'json'})
         .subscribe((response)=> {
            this.location = response.name;
        })
  }  
}