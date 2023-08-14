import { Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
   title:string = "Soluna"
   homeOn:boolean = true;
   alertOn:boolean;
   settingOn:boolean;
   mapOn:boolean;

   constructor(private http:HttpClient){

   }

   ngOnInit(){
      this.http.get<any>("http://127.0.0.1:3000/",{responseType:'json'})
      .subscribe((response)=> {
         console.log(response);
      })
   }
}