import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {
   mySubscription: Subscription;

   response: any;
   event_name: string;
   start: string;
   end: string;
   descriptor: string;
   tags: string;
   alerts: any;

   constructor(
      private dataService: DataServiceService,
      private datepipe: DatePipe,
   ){
      this.mySubscription = dataService.newData.subscribe((data) => {
         this.response = data;
         for(const alertList in this.response.alerts){
            this.event_name = capital_letter(this.response.alerts[0].event);

            this.start = `Issued at ${this.datepipe.transform(new Date, 'EEEE h:mm a MMMM dd', `${this.response.alerts[0].start}`)}`;
            this.end = this.datepipe.transform(new Date, 'h:mm a',`${this.response.alerts[0].end}`);

            this.descriptor = this.response.alerts[0].description;
            this.tags = this.response.alerts[0].tags;
   
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
      });
   }
}

function capital_letter(str) {
   str = str.split(" ");
   for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
   }
   return str.join(" ");
}