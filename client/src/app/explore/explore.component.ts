import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/compiler/src/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

declare const google: any;
declare var MarkerClusterer: any;
declare var map: any;

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
    // Map Centers
    let republicSquareCoords = new google.maps.LatLng(44.816186, 20.460856);

    let mapStyle = [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
            "saturation": "32"
          },
          {
            "lightness": "-3"
          },
          {
            "visibility": "on"
          },
          {
            "weight": "1.18"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
          {
            "saturation": "-70"
          },
          {
            "lightness": "14"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "saturation": "100"
          },
          {
            "lightness": "-14"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          },
          {
            "lightness": "12"
          }
        ]
      }
    ];

    // Map 1
    let options = {
      center: republicSquareCoords,
      zoom: 12,
      // styles: mapStyle
    };

    map = new google.maps.Map(document.getElementById('googleMap'), options);

    // Map 1
    let marker1 = new google.maps.Marker({
      position: republicSquareCoords,
      map: map
    });

    google.maps.event.addListener(map, 'rightclick', function (event) {
      placeMarker(map, event.latLng);
    });

    function placeMarker(map, location) {
      let markerCounter = 1;
      let marker = new google.maps.Marker({
        position: location,
        map: map
      });

      let infowindow1 = new google.maps.InfoWindow({
        content: 'Marker ' + (markerCounter++) + '<br>Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow1.open(map, marker);
      });
    }

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const locations = [

    ];

    // let infoWindow = new google.maps.InfoWindow();

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     let pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent('Location found.');
    //     infoWindow.open(map);
    //     map.setCenter(pos);
    //   }, function() {
    //     this.handleLocationError(true, infoWindow, map.getCenter());
    //   });
    // } else {
    //   // Browser doesn't support Geolocation
    //   this.handleLocationError(false, infoWindow, map.getCenter());
    // }

    //  END
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  getInfo() {

  }

  setMarkers(locations) {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    let markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    map.setCenter(locations[0]);
    map.setZoom(15);
    // return markers;
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

      this.setMarkers(path);
    });
  }

  getPath(data): Observable<any>{
    return this.http.post("http://localhost:8080/api/explore", data);
  }

}
