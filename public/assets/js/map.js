
var points = [];

console.log(points);

var map = null;

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function checkUpdate()
{
	httpGetAsync("/coords", function(result) {
		coords = fixCoords(result);
		if(points.indexOf(coords) == -1)
		{
			points.push(coords);
			setLines();
		}
		
	});
}

function fixCoords(coords)
{
	coords = coords.split(':');
	lat = coords[0].replace(',', '.');
	lng = coords[1].replace(',', '.');
	return {lat: Number(lat), lng: Number(lng)};
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom: 12,
          center: points[0],
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });

	var marker = new google.maps.Marker({
          position: points[0],
          map: map,
          title: 'Start Point'
        });

	setLines();

}

function setLines() {
	var flightPath = new google.maps.Polyline({
	          path: points,
	          geodesic: true,
	          strokeColor: '#FF0000',
	          strokeOpacity: 1.0,
	          strokeWeight: 2
	        });

	        flightPath.setMap(map);

	        var bounds = new google.maps.LatLngBounds();
	        points.forEach(function(point) {
	        	bounds.extend(new google.maps.LatLng(point));
	        })
			map.fitBounds(bounds);
}

window.setInterval(checkUpdate, 1000);