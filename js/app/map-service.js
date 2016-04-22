define([
    'jquery'
],function($){
    var mapService = {

    };

    var mapContainer = document.getElementById("map-canvas");
    var map = undefined;
    var currentMarker = undefined;

    $.extend(mapService, {
        init: function() {
            /* position Amsterdam */
            var latlng = new google.maps.LatLng(52.3731, 4.8922);

            var mapOptions = {
                center: latlng,
                scrollWheel: false,
                zoom: 13
            };

            map = new google.maps.Map(mapContainer, mapOptions);
        },

        click: function(callback) {
            map.addListener('click', function(evt){
                if(currentMarker) {
                    currentMarker.setMap(null);
                }
                currentMarker = new google.maps.Marker({
                    position: evt.latLng,
                    map: map
                });
                
                if(typeof callback === 'function') {
                    callback(evt.latLng)
                }
            });
        }
    });


    $.extend(window,{
        map: function() {
            return mapService;
        }
    })
});