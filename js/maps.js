L.mapbox.accessToken = 'pk.eyJ1IjoiamFrZWNvbGwiLCJhIjoiQW1QeS1kRSJ9.Ai2eq-OOBHH3ZDjzLqWWbw';

var map;
var markers;


function initialize() {
    var coordinates = new L.LatLng(40.649021, -73.949976);
    map = new L.mapbox.map('map', 'jakecoll.c0364365', { zoomControl: false })
        .setView(coordinates, 12)

    markers = new L.MarkerClusterGroup({ disableClusteringAtZoom: 16});

    var markerData = new cityData('data/Brooklyn_geojson.json')

    function cityData(ref) {
        this.ref = ref;
    }

    $.getJSON(markerData.ref, function(data) {
        var geojson = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                var popupContent = 
                                '<a target="_blank" class="popup" href="' + feature.properties.imgUrl + '">' +
                                '<img src="' + feature.properties.imgUrl + '" />' + 
                                '</a><br/>' + 
                                '<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.brownstoner.com" data-text="Building of the Day" data-via="blogMap" data-hashtags="BK">Tweet</a>' +
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

new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);

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
        newMarkers('data/Manhattan_geojson.json');
        
    });
    $("#2").on('click', function () {
        newLocation(40.649021, -73.949976,12);
        newMarkers('data/Brooklyn_geojson.json');
    });
    $("#3").on('click', function () {
        newLocation(39.952329,-75.163603,12);
        newMarkers('data/Philadelphia_geojson.json');
    });
    $("#4").on('click', function () {
        newLocation(38.890097,-77.035659,13);
        newMarkers('data/DC_geojson.json');
    });

});
