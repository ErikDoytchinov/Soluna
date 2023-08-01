import { AppComponent } from './../app.component';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Pipe, PipeTransform, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServiceService } from '../data-service.service';

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
    private dataService: DataServiceService,
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
    //gets the id number of the list location that we click
    var value = event.target.attributes.id.nodeValue;

    this.lat = this.locArray[value].lat;
    this.lon = this.locArray[value].lon;

    //sets latidude and longitude values in the searchQuery object
    this.dataService.publish({latitude: this.lat, longitude: this.lon})

   this.searchQuery.controls['location'].setValue('');
   setTimeout(() => this.onPress(0), 10);
  }

  public onPress($event): void {
    this.locations = "";
    this.locArray = [];
    document.getElementsByClassName('location-before')[0].classList.remove("location-after");

    // Process data here;
    let location = this.searchQuery.controls.location.value;
    //start of is empty check
    if(location?.length != 0){
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=1e9a2252a81388fe3fff130f96a58827`;
      this.http.get<any>(url,{responseType:'json'})
          .pipe(map((response) => {
            for(const place in response){
              this.locArray.push({...response[place], id: place});
              this.locations += `<a class="loc" id="${place}">${response[place].name}, ${response[place].country}`;
            }
          }))
          .subscribe((response)=> { 
        })
        setTimeout(() => this.setEvent(), 1000);
        document.getElementsByClassName('location-before')[0].classList.add("location-after");
    } //if not empty
  } 
}