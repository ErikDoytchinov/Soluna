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

   settingSwitch(){
      this.appComponent.settingOn = true;
   }

   homeSwitch(){
      this.appComponent.settingOn = false;
   }
}
