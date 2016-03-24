﻿var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'
        
        var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>';
        
		var streets = L.tileLayer(mbUrl, {id: 'mapbox.high-contrast', attribution: mbAttr}),
            satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr});
        
        var map = L.map('map',{
            center: [40.7913, -77.8586], 
            zoom: 11,
            layers:[streets]
        });
        
        var baseLayers = {
			"Streets": streets,
			"Satellite": satellite
		};
/*
        var overlayMaps = {
            "Townships" : townships
        };
        
        */

        L.control.layers(baseLayers,null,{collapsed:false}).addTo(map);
