import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/compiler/src/core';

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

  private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };

  constructor() { }

  ngOnInit() {
  }

  sliderChange() {
    console.log(this.sportSlider);
  }

}
