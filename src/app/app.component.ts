import { Component, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'Soluna';
    temperature:any;
    location:any;
    date = "Monday"
    time = this.datepipe.transform((new Date), 'h:mm');
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
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.searchQuery.latidude}&lon=${this.searchQuery.longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=metric`;
      this.http.get<any>(url,{responseType:'json'})
         .subscribe((response)=> {
            this.temperature = formatNumber(response.main.temp, "en-CA", '1.0-0')
            this.location = response.name
         })
  }  
}