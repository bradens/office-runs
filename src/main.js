"use strict";

const async = require('async');
var map;

window.onMapsLoaded = () =>{
    console.log('maps loaded!');
    const mapEl = document.getElementById('das-map');

    map = new google.maps.Map(mapEl, {
        center: {lat:43.51302699185908,lng:-80.52832913585007},
        zoom: 13
    });

    let runs = [1,2,3,4,5,6,7,8,9,10].map(n => `${n}.json`);

    async.reduce(runs, [], (acc, file, cb) => {
        fetch(`runs/${file}`)
        .then(res => res.json())
        .then(points => {
            acc = acc.concat(points);
            cb(null, acc);
        });
    }, (err, points) => {
        points = points.map(p => {
            return new google.maps.LatLng(p.lat, p.lng);
        });
        // map.setCenter(new google.maps.LatLng(points[0].lat, points[0].lng));
        let heatmap = new google.maps.visualization.HeatmapLayer({
            data: points,
            map: map
        });
        heatmap.set('radius', 15);
    });
}
