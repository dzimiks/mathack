import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };

  constructor() { }

  ngOnInit() {
  }

}
