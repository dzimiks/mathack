import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare const google: any;

@Component({
  selector: 'app-plan-my-day',
  templateUrl: './plan-my-day.component.html',
  styleUrls: ['./plan-my-day.component.scss']
})
export class PlanMyDayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Map Centers
    let republicSquareCoords = new google.maps.LatLng(44.816186, 20.460856);

    // Map 1
    let options = {
      center: republicSquareCoords,
      zoom: 15,
      // styles: darkModeStyle
    };

    let map = new google.maps.Map(document.getElementById('googleMap'), options);

    // Map 1
    let marker1 = new google.maps.Marker({
      position: republicSquareCoords,
      map: map
    });

    google.maps.event.addListener(map, 'rightclick', function (event) {
      this.placeMarker(map, event.latLng);
    });
  }

  placeMarker(map, location) {
    let markerCounter = 1;
    let marker = new google.maps.Marker({
      position: location,
      map: map
    });

    let infowindow = new google.maps.InfoWindow({
      content: 'Marker ' + (markerCounter++) + '<br>Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });
  }

}
