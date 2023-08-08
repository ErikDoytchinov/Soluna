import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataFetchService } from '../data-fetch.service';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {
   mySubscription: Subscription;

   event_name: string;
   start: string;
   end: string;
   descriptor: string;
   tags: string;
   alerts: any = `
      <div class="alert-container">   
         <div class="info">
            <div class="event-name">NO CURRENT ALERTS</div>
         </div>
         <div class="descriptor">
            At this current location there is no ongoing weather alerts present.
         </div>
      </div>`;

   
   searchQuery:any = {latitude: 0, longitude: 0};
   weatherInfo = {
      alertInfo: {}
   }

   constructor(
      private fetchService: DataFetchService,
      private datepipe: DatePipe,
      private dataService: DataServiceService,
   ){
      this.mySubscription = dataService.newData.subscribe((data) => {
         this.searchQuery = data
         if(this.searchQuery.latitude != undefined){      
            this.weatherInfo = this.fetchService.fetchWeatherInfo(this.searchQuery);
            setTimeout(() => this.updateAlert(), 200);   
         }
      });
   }

   updateAlert(){
      if(this.weatherInfo.alertInfo != undefined){
         for(const alertList in this.weatherInfo.alertInfo){
            this.event_name = capital_letter(this.weatherInfo.alertInfo[0].event);
   
            this.start = `Issued at ${this.datepipe.transform(new Date, 'EEEE h:mm a MMMM dd', `${this.weatherInfo.alertInfo[0].start}`)}`;
            this.end = this.datepipe.transform(new Date, 'h:mm a',`${this.weatherInfo.alertInfo[0].end}`);
   
            this.descriptor = this.weatherInfo.alertInfo[0].description;
            this.tags = this.weatherInfo.alertInfo[0].tags;
   
            this.alerts = `    
            <div class="alert-container">   
               <div class="info">
                  <div class="event-name">${ this.event_name }</div>
                  <div class="date-issued">${ this.start }</div>
               </div>
               <div class="descriptor">
                  ${this.descriptor}
               </div>
            </div>
            ` 
         }
      } else {
         this.alerts = `
         <div class="alert-container">   
            <div class="info">
               <div class="event-name">NO CURRENT ALERTS</div>
            </div>
            <div class="descriptor">
               At this current location there is no ongoing weather alerts present.
            </div>
         </div>`;
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