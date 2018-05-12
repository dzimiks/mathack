import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/compiler/src/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

declare var initMap: any;

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  sportSlider: any = 50;
  historicalSlider: any = 50;
  natureSlider: any = 50;
  nightlifeSlider: any = 50;

  city: String = "Choose city";

  private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sliderChange() {
  }

  selectCity(newCity) {
    this.city = newCity;
  }

  submit() {
    let info = {
      city: this.city,
      sportWeight: this.sportSlider / 100.0,
      nightlifeWeight: this.nightlifeSlider / 100.0,
      natureWeight: this.natureSlider / 100.0,
      historicalWeight: this.historicalSlider / 100.0
    }
    console.log(info.city);
    this.getPath(info).subscribe((res) => {
      let path = res.path;
      path.forEach(coord => {
        console.log(coord.lat + " " + coord.lng);
      });
    });
  }

  getPath(data): Observable<any>{
    return this.http.post("http://localhost:8080/api/explore", data);
  }

}
