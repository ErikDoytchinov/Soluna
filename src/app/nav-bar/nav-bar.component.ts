import { AppComponent } from './../app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
   constructor(
      private appComponent: AppComponent,
   ){}

   windowSwitch(window:any){
      switch(window){
         case "home":
            this.appComponent.homeOn = true;
            this.appComponent.alertOn = false;
            this.appComponent.settingOn = false;
            break;
         case "alert":
            this.appComponent.homeOn = false;
            this.appComponent.alertOn = true;
            this.appComponent.settingOn = false;
            break;
         case "setting":
            this.appComponent.homeOn = false;
            this.appComponent.alertOn = false;
            this.appComponent.settingOn = true;
            break;
         default:
            return;
      }
   }
}
