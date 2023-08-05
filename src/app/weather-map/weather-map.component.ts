import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Leaflet from 'leaflet'; 
import { DatePipe, formatNumber } from '@angular/common';


Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent {
   constructor(
      private http: HttpClient,
      private datepipe: DatePipe,
   ){}
   mapLayer = undefined;
   searchQuery:any = {latitude: 0, longitude: 0};

   //declare all different map layers
   sateliteLayer = Leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
      attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   });

   tempLayer = Leaflet.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=1e9a2252a81388fe3fff130f96a58827', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });

   measurement: any;

   weatherInfo = {
      image: "/assets/icons/01d.png",
      temperature: "loading...",
      location: "loading...",
      time: "loading...",
      date: "loading...",
      weather_descriptor: "loading..."
   }

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
      ]
   }

   map!: Leaflet.Map;
   markers: Leaflet.Marker[] = [];
   options = {
      layers: [
         this.mapLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
         })
      ],
      zoom: 16,
      center: { lat: 0 ,lng: 0}
   }

   onMapReady($event: Leaflet.Map) {
      this.map = $event;
      //will get the location of user and move window to it.
      this.map.locate({setView: true, maxZoom: 16})        
      .on('locationfound', (e) => {
         var marker = Leaflet.marker(e.latlng).bindPopup('Your are here :)');
         var circle = Leaflet.circle((e.latlng), e.accuracy/2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
         });
         this.map.addLayer(marker);
         this.map.addLayer(circle);

         this.searchQuery = {latitude: e.latlng.lat, longitude: e.latlng.lng};
         this.fetchWeatherInfo();
      });
   }

   mapClicked($event: any) {
      console.log($event.latlng.lat, $event.latlng.lng);
      this.searchQuery = {latitude: $event.latlng.lat, longitude: $event.latlng.lng};
      this.fetchWeatherInfo();
   }

   switchLayer($event){
      const layer = $event.target.attributes.id.nodeValue;

      switch (layer) {
         case "temperature":
            if(!this.map.hasLayer(this.tempLayer)){
               this.map.addLayer(this.tempLayer);
            } else {this.map.removeLayer(this.tempLayer);}
            break;
         default:
            break;
      }
   }

   public fetchWeatherInfo(){
      if(localStorage.getItem("measurement") != undefined) {this.measurement = localStorage.getItem("measurement")}
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.searchQuery.latitude}&lon=${this.searchQuery.longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=${this.measurement}`;
      this.http.get<any>(url,{responseType:'json'})
         .subscribe((response)=> {
            if(response.timezone_offset > 0) {
               this.weatherInfo.time = this.datepipe.transform(new Date, 'h:mm a', `GMT+${response.timezone_offset/3600}`);
               this.weatherInfo.date = this.datepipe.transform(new Date, 'EEEE',`GMT+${response.timezone_offset/3600}`);
            } else {
               this.weatherInfo.time = this.datepipe.transform(new Date, 'h:mm a', `GMT${response.timezone_offset/3600}`);
               this.weatherInfo.date = this.datepipe.transform(new Date, 'EEEE', `GMT${response.timezone_offset/3600}`);
            }
            this.weatherInfo.image = `/assets/icons/${response.current.weather[0].icon}.png`;
            this.weatherInfo.weather_descriptor = capital_letter(response.current.weather[0].description);
            this.weatherInfo.temperature = formatNumber(response.current.temp, "en-CA", '1.0-0')

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
         });

      const urlName = `https://api.openweathermap.org/data/2.5/weather?lat=${this.searchQuery.latitude}&lon=${this.searchQuery.longitude}&appid=1e9a2252a81388fe3fff130f96a58827&units=metric`;
      this.http.get<any>(urlName,{responseType:'json'})
         .subscribe((response)=> {
            this.weatherInfo.location = response.name;
         })
   }
}

function capital_letter(str) {
   str = str.split(" ");
   for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
   }
   return str.join(" ");
}
