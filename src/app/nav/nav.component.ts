import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  
  public searchQuery = new FormGroup({
    location: new FormControl(''),
  });

  constructor(
    //private formBuilder: FormBuilder,
    private appComponent: AppComponent,
    private http: HttpClient,
  ) {}

  onSubmit(): void {
    // Process data here
    let location = this.searchQuery.controls.location.value;
    let lat;
    let lon;

    const url = 'http://api.openweathermap.org/geo/1.0/direct?q='+location+'&limit=5&appid=1e9a2252a81388fe3fff130f96a58827';
    this.http.get<any>(url,{responseType:'json'})
        .subscribe((response)=> { 
          lat = response[0].lat;
          lon = response[0].lon;
          console.log(response[0]);

          this.appComponent.searchQuery.latidude = lat;
          this.appComponent.searchQuery.longitude = lon;
    
          this.appComponent.fetchWeatherInfo();
      })
  }
}
