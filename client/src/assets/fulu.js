let map;

let darkModeStyle = [{
        "featureType": "all",
        "elementType": "all",
        "stylers": [{
                "invert_lightness": true
            },
            {
                "saturation": "-9"
            },
            {
                "lightness": "0"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [{
            "weight": "1.00"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
            "weight": "0.49"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{
                "visibility": "on"
            },
            {
                "weight": "0.01"
            },
            {
                "lightness": "-7"
            },
            {
                "saturation": "-35"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "on"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "on"
        }]
    }
];

function initMap(infowindow) {

    // Map Centers
    let londonCoords = new google.maps.LatLng(51.508742, -0.120850);
    let palazzoDucaleCoords = new google.maps.LatLng(45.434046, 12.340284);
    let republicSquareCoords = new google.maps.LatLng(44.816186, 20.460856);

    // Map 1
    let options = {
        center: londonCoords,
        zoom: 5,
        // styles: darkModeStyle
    };

    map = new google.maps.Map(document.getElementById('map'), options);

    // Map 1
    let marker1 = new google.maps.Marker({
        position: londonCoords,
        map: map
    });

    google.maps.event.addListener(map, 'rightclick', function(event) {
        placeMarker(map, event.latLng);
    });

    // Overall
    let markerCounter = 1;

    function placeMarker(map, location) {
        let marker = new google.maps.Marker({
            position: location,
            map: map
        });

        let infowindow = new google.maps.InfoWindow({
            content: 'Marker ' + (markerCounter++) + '<br>Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }
}