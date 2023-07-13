import { Component, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Soluna';
  temperature:any;
  location:any;
  searchQuery:any;

  constructor(private http: HttpClient){
    
  }

  ngOnInit(){
    this.fetchWeatherInfo();
  }

   private fetchWeatherInfo(){
      const url = 'https://api.openweathermap.org/data/2.5/weather?lat=43.651070&lon=-79.4&appid=1e9a2252a81388fe3fff130f96a58827&units=metric';
      this.http.get<any>(url,{responseType:'json'})
         .subscribe((response)=> {
            this.temperature = formatNumber(response.main.temp, "en-CA", '1.0-0')
            this.location = response.name
            console.log(response);
         })
  }  
}