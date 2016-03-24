function addTownships(){

// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>Off Campus Population</h4>' +  (props ?
				'<b>' + props.MUNICIPAL1 + '</b><br />' + props.Count_ + ' Sudents '
				: 'Hover over a Township');
		};

		info.addTo(map);

        
        function getColor(d){
            return  d > 5000    ? '#253494':
                    d > 1000    ? '#2c7fb8' :
                    d > 50      ? '#41b6c4' :
                    d > 25      ? '#a1dab4' :
                                  '#ffffcc';
        }
        
        function style(feature) {
            return {
                fillColor: getColor(feature.properties.Count_),
                weight: 2,
                opacity: 1,
                color: 'black',
                fillOpacity: 0.7
            };
        }
        
        function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 5,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}
        
        var geojson;

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}
        
        geojson = L.geoJson(townships, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
        
    
       var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [1, 25, 50, 1000, 5000],
				labels = [],
				from, to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);
    }