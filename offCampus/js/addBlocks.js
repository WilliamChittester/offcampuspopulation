function addBlocks(){

// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>Block Population</h4>' +  (props ?
				 '<b>' + props.Count_ + ' Sudents ' + '</b>'
				: 'Hover over a Block');
		};

		info.addTo(map);

        
        function getColor(d){
            return  d > 500    ? '#253494':
                    d > 250    ? '#2c7fb8' :
                    d > 100    ? '#41b6c4' :
                    d > 50     ? '#7fcdbb':
                    d > 25     ? '#c7e9b4' :
                                 '#ffffcc';
        }
        
        function style(feature) {
            return {
                fillColor: getColor(feature.properties.Count_),
                weight: 1,
                opacity: 1,
                color: '#666666',
                fillOpacity: 0.7
            };
        }
        
        function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 3,
				color: 'red',
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
        
        geojson = L.geoJson(tabBlockCount, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
        
    
       var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [1, 25, 50, 100, 250, 500],
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