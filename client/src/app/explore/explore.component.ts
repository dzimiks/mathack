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

    // Map 1
    let options = {
      center: republicSquareCoords,
      zoom: 10,
      // styles: darkModeStyle
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

      let infowindow = new google.maps.InfoWindow({
        content: 'Marker ' + (markerCounter++) + '<br>Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });
    }

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // const locations = [
    //   { lat: -31.563910, lng: 147.154312 },
    //   { lat: -33.718234, lng: 150.363181 },
    //   { lat: -33.727111, lng: 150.371124 },
    //   { lat: -33.848588, lng: 151.209834 },
    //   { lat: -33.851702, lng: 151.216968 },
    //   { lat: -34.671264, lng: 150.863657 },
    //   { lat: -35.304724, lng: 148.662905 },
    //   { lat: -36.817685, lng: 175.699196 },
    //   { lat: -36.828611, lng: 175.790222 },
    //   { lat: -37.750000, lng: 145.116667 },
    //   { lat: -37.759859, lng: 145.128708 },
    //   { lat: -37.765015, lng: 145.133858 },
    //   { lat: -37.770104, lng: 145.143299 },
    //   { lat: -37.773700, lng: 145.145187 },
    //   { lat: -37.774785, lng: 145.137978 },
    //   { lat: -37.819616, lng: 144.968119 },
    //   { lat: -38.330766, lng: 144.695692 },
    //   { lat: -39.927193, lng: 175.053218 },
    //   { lat: -41.330162, lng: 174.865694 },
    //   { lat: -42.734358, lng: 147.439506 },
    //   { lat: -42.734358, lng: 147.501315 },
    //   { lat: -42.735258, lng: 147.438000 },
    //   { lat: -43.999792, lng: 170.463352 }
    // ];

    // let markers = locations.map(function(location, i) {
    //   return new google.maps.Marker({
    //     position: location,
    //     label: labels[i % labels.length]
    //   });
    // });

    const locations = [

    ];

    // this.setMarkers(map, locations);

    // let markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    //  END
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
