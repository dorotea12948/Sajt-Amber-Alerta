<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<div id="map" style="width: 100%; height: 500px;"></div>
<script>
	var map = L.map('map').setView([44.0165, 21.0059], 7);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: 'Map data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	var markersLayer = new L.LayerGroup();
	map.addLayer(markersLayer);

	function onMapClick(e) {
    	var marker = L.marker(e.latlng).addTo(markersLayer);
    	
	}

	map.on('click', onMapClick);
</script>

</body>
