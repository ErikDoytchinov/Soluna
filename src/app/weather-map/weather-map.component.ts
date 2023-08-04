import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet'; 


Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent {
  public searchQuery:any = {latitude: 0, longitude: 0};

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
      Leaflet.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=1e9a2252a81388fe3fff130f96a58827', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
      // Leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
		  // maxZoom: 19, attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	    // })
    ],
    zoom: 16,
    center: { lat: this.searchQuery.latitude, lng: this.searchQuery.longitude }
  }

  initMarkers() {
    const initialMarkers = [
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
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
  });
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }   

  getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position: any) => {
       if (position) {
          this.searchQuery.latitude = position.coords.latitude;
          this.searchQuery.longitude = position.coords.longitude;
       }
    },
       (error: any) => console.log(error));
    } else {
       alert("Geolocation is not supported by this browser.");
    }
 }
}
