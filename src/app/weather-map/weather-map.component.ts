import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Leaflet from 'leaflet'; 
import { DatePipe, formatNumber } from '@angular/common';
import { DataFetchService } from '../data-fetch.service';


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
      private fetchService: DataFetchService
   ){}
   mapLayer = undefined;
   measurement:string = "metric";
   searchQuery:any = {latitude: 0, longitude: 0};

   //declare all different map layers
   sateliteLayer = Leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
      attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   });

   precipitationLayer = Leaflet.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=1e9a2252a81388fe3fff130f96a58827', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });

   cloudsLayer = Leaflet.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=1e9a2252a81388fe3fff130f96a58827', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });

   pressureLayer = Leaflet.tileLayer('https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=1e9a2252a81388fe3fff130f96a58827', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });

   windLayer = Leaflet.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=1e9a2252a81388fe3fff130f96a58827', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });

   tempLayer = Leaflet.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=1e9a2252a81388fe3fff130f96a58827', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });

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

   // map setup
   map!: Leaflet.Map;
   markers: Leaflet.Marker[] = [];
   options = {
      layers: [
         // `https://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png`
         this.mapLayer = Leaflet.tileLayer('https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
         })
      ],
      zoom: 16,
      center: { lat: 0 ,lng: 0}
   }

   onMapReady($event: Leaflet.Map) {
      this.map = $event;
      //will get the location of user and move window to it.
      this.map.locate({setView: true, maxZoom: 12})        
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
         this.weatherInfo = this.fetchService.fetchWeatherInfo(this.searchQuery);
      });
   }

   mapClicked($event: any) {
      console.log($event.latlng.lat, $event.latlng.lng);
      this.searchQuery = {latitude: $event.latlng.lat, longitude: $event.latlng.lng};
      this.weatherInfo = this.fetchService.fetchWeatherInfo(this.searchQuery);
   }

   switchLayer($event){
      const layer = $event.target.attributes.id.nodeValue;

      switch (layer) {
         case "precipitation":
            if(!this.map.hasLayer(this.precipitationLayer)){
               this.map.addLayer(this.precipitationLayer);
            } else {this.map.removeLayer(this.precipitationLayer);}
            break;
         case "clouds":
            if(!this.map.hasLayer(this.cloudsLayer)){
               this.map.addLayer(this.cloudsLayer);
            } else {this.map.removeLayer(this.cloudsLayer);}
            break;
         case "pressure":
            if(!this.map.hasLayer(this.pressureLayer)){
               this.map.addLayer(this.pressureLayer);
            } else {this.map.removeLayer(this.pressureLayer);}
            break;
         case "wind":
            if(!this.map.hasLayer(this.windLayer)){
               this.map.addLayer(this.windLayer);
            } else {this.map.removeLayer(this.windLayer);}
            break;
         case "temp":
            if(!this.map.hasLayer(this.tempLayer)){
               this.map.addLayer(this.tempLayer);
            } else {this.map.removeLayer(this.tempLayer);}
            break;
         default:
            break;
      }
   }
}
