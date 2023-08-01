import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
   measurement:boolean = false;

   constructor(
      private dataService: DataServiceService,
   ){}

   ngOnInit(){
      if(localStorage.getItem("measurement") != undefined){
         if(localStorage.getItem("measurement") == "imperial") {
            console.log("hey")
            this.measurement = true;
         }
      }
   }

   onChange(targetCheckBox: any) {
      
      const farenheit = targetCheckBox.checked;
      if(farenheit){
         this.dataService.publish("imperial");
      } else {
         this.dataService.publish("metric");
      }
   }
}
