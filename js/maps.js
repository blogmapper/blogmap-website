//L.mapbox.accessToken = "MAPBOX_API_KEY";

var map;
var markers;


function initialize() {
    var coordinates = new L.LatLng(40.649021, -73.949976);
    map = new L.mapbox.map('map')
        .setView(coordinates, 12)
        .addLayer(L.mapbox.tileLayer(map_style));

    markers = new L.MarkerClusterGroup({ disableClusteringAtZoom: 16});

    var markerData = new cityData(brooklyn_data)

    function cityData(ref) {
        this.ref = ref;
    }

    $.getJSON(markerData.ref, function(data) {
        var geojson = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                var popupContent = 
                                '<a target="_blank" class="popup" href="' + feature.properties.imgUrl + '">' +
                                '<img src="' + feature.properties.imgUrl + '" />' + '</a><br/>' + 
                                '<br/><p><strong>Address: </strong>' + feature.properties.address + 
                                '<br/><strong>Neighborhood: </strong>' + feature.properties.neighborhood +
                                '<br/><strong>Blog: </strong>' + feature.properties.sourceName + 
                                '<br/><strong>Title: </strong>' + feature.properties.title +
                                '<br/><form target="_blank" action="' + feature.properties.url
                                + '"><input type="submit" value="Open Article in New Window"></form>'
                                +'</p>';
                layer.bindPopup(popupContent);
         }
        });
        geojson.addTo(markers);
    });

map.addLayer(markers);


}

function newLocation(newLat,newLng,newZoom) {
    var newCoord = new L.LatLng(newLat,newLng)
    map.setView(newCoord, newZoom);
}

function newMarkers(newDataLink) {
    map.removeLayer(markers);

    markers = new L.MarkerClusterGroup({ disableClusteringAtZoom: 16});

    $.getJSON(newDataLink, function(data) {
        var geojson = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                var popupContent = 
                                '<a target="_blank" class="popup" href="' + feature.properties.imgUrl + '">' +
                                '<img src="' + feature.properties.imgUrl + '" />' + '</a><br/>' + 
                                '<br/><p><strong>Address: </strong>' + feature.properties.address + 
                                '<br/><strong>Neighborhood: </strong>' + feature.properties.neighborhood +
                                '<br/><strong>Blog: </strong>' + feature.properties.sourceName + 
                                '<br/><strong>Title: </strong>' + feature.properties.title +
                                '<br/><form target="_blank" action="' + feature.properties.url
                                + '"><input type="submit" value="Open Article in New Window"></form>'
                                +'</p>';
                layer.bindPopup(popupContent);
         }
        });
        geojson.addTo(markers);
    });

map.addLayer(markers);


}

window.addEventListener('load',initialize,false);


$(document).ready(function() {
    $("#1").on('click', function () {
        newLocation(40.769649,-73.979600,12);
        newMarkers(manhattan_data);
        
    });
    $("#2").on('click', function () {
        newLocation(40.649021, -73.949976,12);
        newMarkers(brooklyn_data);
    });
    $("#3").on('click', function () {
        newLocation(39.952329,-75.163603,12);
        newMarkers(philadelphia_data);
    });

});

