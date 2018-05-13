import { Component, OnInit } from '@angular/core';
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
  directionsDisplay: any;
  directionsService: any;
  locations: object[] = [];
  optimalRoute: object[] = [];
  flag: boolean = false;

  sportSlider: any = 50;
  historicalSlider: any = 50;
  natureSlider: any = 50;
  nightlifeSlider: any = 50;

  city: String = "Belgrade";

  private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Map Centers
    let republicSquareCoords = new google.maps.LatLng(44.816186, 20.460856);

    // Map 1
    let options = {
      center: republicSquareCoords,
      zoom: 12,
      // styles: mapStyle
    };

    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('googleMap'), options);
    this.directionsDisplay.setMap(map);

    // calculateAndDisplayRoute(directionsService, directionsDisplay);
    // this.calculateAndDisplayRouteWaypoints(directionsService, directionsDisplay);

    //   <!--Card content-->
    // <div class="card-body">
    // <!--Title-->
    // <h4 class="card-title">Nature</h4>
    //   <!--Text-->
    //   <div class="slidecontainer">
    //   <label>{{ natureSlider }} %</label>
    // <input type="range" min="0" max="100" value="50" class="slider" [(ngModel)]="natureSlider" (ngModelChange)="sliderChange()">
    //   </div>
    //   </div>
    //
    //   </div>
    //   </div>

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      let selectedMode = 'DRIVING';

      directionsService.route({
        origin: {
          lat: 44.8170117585242,
          lng: 20.458796063476598
        },
        destination: {
          lat: 44.82394295466728,
          lng: 20.457100781162467
        },
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
      }, function (response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    // Map 1
    // let marker1 = new google.maps.Marker({
    //   position: republicSquareCoords,
    //   map: map
    // });

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

    google.maps.event.addListener(map, 'click', function () {
      getInfo();
    });

    function getInfo() {
      let city = [
        {
          lat: 23.43344,
          lng: 32.43242
        }
      ];

      let infowindow = new google.maps.InfoWindow();
      let service = new google.maps.places.PlacesService(map);

      service.getDetails({
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(map, this);
          });
        }
      });
    }

    // this.calculateAndDisplayRouteWaypoints(directionsService, directionsDisplay);

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
    console.log("get info works");
  }

  setMarkers(locations) {
    this.locations.push(locations);
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

    // this.calculateAndDisplayRouteWaypoints(this.directionsDisplay, this.directionsService, locations);
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
    };
    console.log(info.city);
    this.getPath(info).subscribe((res) => {
      let path = res.path;
      path.forEach(coord => {
        console.log(coord.lat + " " + coord.lng);
      });

      // this.setMarkers(path);
      this.flag = true;
      this.calculateAndDisplayRouteWaypoints(this.directionsDisplay, this.directionsService, path);
    });
  }

  calculateAndDisplayRouteWaypoints(directionsService, directionsDisplay, locations) {
    let display = this.directionsDisplay;
    let origin = locations[0];
    let dest = locations[locations.length - 1];
    let waypts = [];

    for (let i = 1; i < locations.length - 1; i++) {
      waypts.push({
        location: locations[i],
        stopover: true
      });
    }

    this.directionsService.route({
      origin: {
        lat: origin.lat,
        lng: origin.lng
      },
      destination: {
        lat: dest.lat,
        lng: dest.lng
      },
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);

        let route = response.routes[0];
        let geocoded_waypoint = response.geocoded_waypoints[0];
        // let summaryPanel = document.getElementById('directions-panel');
        // summaryPanel.innerHTML = '';

        // let table = document.getElementById('table-panel');
        // table.innerHTML = '';
        //
        // table.innerHTML += '<br>' +
        //   '<table class="table table-striped"><br>' +
        //   '  <thead><br>' +
        //   '    <tr><br>' +
        //   '      <th>#</th><br>' +
        //   '      <th>From</th><br>' +
        //   '      <th>To</th><br>' +
        //   '      <th>Distance</th><br>' +
        //   '      <th>Duration</th><br>' +
        //   '    </tr><br>' +
        //   '  </thead><br>' +
        //   '  <tbody><br>';

        // '    <tr>\n' +
        // '      <th scope="row">1</th>\n' +
        // '      <td>Mark</td>\n' +
        // '      <td>Otto</td>\n' +
        // '      <td>@mdo</td>\n' +
        // '    </tr>\n' +
        // '  </tbody>\n' +
        // '</table>\n';

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          let routeSegment = i + 1;

          // summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          //   '</b><br>From: ';
          // summaryPanel.innerHTML += route.legs[i].start_address + '<br>To: ';
          // summaryPanel.innerHTML += route.legs[i].end_address + '<br>Distance: ';
          // summaryPanel.innerHTML += route.legs[i].distance.text + '<br>Duration: ';
          // summaryPanel.innerHTML += route.legs[i].duration.text + '<br>Summary: ';
          // summaryPanel.innerHTML += route.summary + '<br>Place ID: ';
          // summaryPanel.innerHTML += geocoded_waypoint.place_id + '<br><br>';

          // table.innerHTML += '<tr><th scope="row">' + routeSegment+ '</th><br>' +
          //                    '<td>' + route.legs[i].start_address + '</td><br>' +
          //                    '<td>' + route.legs[i].end_address + '</td><br>' +
          //                    '<td>' + route.legs[i].distance.text + '</td><br>' +
          //                    '<td>' + route.legs[i].duration.text + '</td><br>' +
          //                    '</tr><br>';

          this.optimalRoute.push({
            start_address: route.legs[i].start_address,
            end_address: route.legs[i].end_address,
            distance: route.legs[i].distance.text,
            duration: route.legs[i].duration.text
          });
        }

        // let table = document.getElementById('table-panel');
        // let cnt = 1;
        // table.innerHTML += '<br><table class="table table-striped"><br><thead><br><tr><br><th>#</th><br><th>From</th><br><th>To</th><br><th>Distance</th><br><th>Duration</th><br></tr><br></thead><br><tbody><br>';
        //
        // table.innerHTML += '<tr><th scope="row">' + (cnt++) + '</th><br>' +
        //                    '<td>' + this.optimalRoute.start_address + '</td><br>' +
        //                    '<td>' + this.optimalRoute.end_address + '</td><br>' +
        //                    '<td>' + this.optimalRoute.distance.text + '</td><br>' +
        //                    '<td>' + this.optimalRoute.duration.text + '</td><br>' +
        //                    '</tr><br>';
        //
        // table.innerHTML += '</tbody><br></table><br>';
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    this.directionsDisplay = display;
  }

  getRoutes() {
    return this.optimalRoute;
  }

  getPath(data): Observable<any>{
    return this.http.post("http://localhost:8080/api/explore", data);
  }

}

