import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { AppComponent } from '../app.component';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent {
  newContent:any;
  constructor(
    private elRef:ElementRef,
    private http: HttpClient,
    private appComponent: AppComponent,
  ){}
  

  //create a formGroup object 
  public searchQuery = new FormGroup({
    location: new FormControl(''),
  });

  locations: string = '';
  locArray:any = [];
  lat!: number;
  lon!: number;

  setEvent(){
    //Get list of all locations
    let elementList = this.elRef.nativeElement.querySelectorAll(".loc");
    //Add event handler each.
    for(let i=0; i < elementList.length; i++){
      elementList[i].addEventListener('click', this.onClick.bind(this));
    }
  }

  public onClick(event:any):void {
    var target = event.target;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    console.log(this.locArray[value]);
    this.lat = this.locArray[value].lat;
    this.lon = this.locArray[value].lon;

    //sets latidude and longitude values in the searchQuery object
    this.appComponent.searchQuery.latidude = this.lat;
    this.appComponent.searchQuery.longitude = this.lon;

    this.appComponent.fetchWeatherInfo();
  }

  public onPress(): void {
    this.locations = "";
    this.locArray = [];
    // Process data here;
    let location = this.searchQuery.controls.location.value;
    //start of is empty check
    if(location?.length != 0){
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=1e9a2252a81388fe3fff130f96a58827`;
      this.http.get<any>(url,{responseType:'json'})
          .pipe(map((response) => {
            for(const place in response){
              this.locArray.push({...response[place], id: place});
              
              this.locations += `<a class="loc" id="${place}">${response[place].name}, ${response[place].country}<a/>`;
            }
          }))
          .subscribe((response)=> { 
        })
        setTimeout(() => this.setEvent(), 1000);
    } //if not empty
  } 
}
