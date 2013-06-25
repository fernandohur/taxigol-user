describe('Google Map', function() {

	var position, googleGeocoder, googleMap, googleMapMarker, googleMapLatLng;

	beforeEach(function() {

		setFixtures('<div id="mapCanvas"></div>');

		googleMap = {
			setCenter : jasmine.createSpy('setCenter')
		};
		googleGeocoder = {
			geocode : jasmine.createSpy('geocode').andCallFake(geocodeCallback)
		};
		googleMapMarker = {
			getPosition : jasmine.createSpy('getPosition')
		};
		googleMapLatLng = {};
		spyOn(navigator.geolocation, "getCurrentPosition").andCallFake(function() {
			position = {
				coords : {
					latitude : 32.8569,
					longitude : -96.9628
				}
			};
			arguments[0](position);
		});

		document.getElementById = jasmine.createSpy();
		spyOn(google.maps, "Map").andReturn(googleMap);
		spyOn(google.maps, "Geocoder").andReturn(googleGeocoder);
		spyOn(google.maps, "Marker").andReturn(googleMapMarker);
		spyOn(google.maps, "LatLng").andReturn(googleMapLatLng);
		spyOn(google.maps.event, "addListener");
		var spyEvent = spyOnEvent('#timeControl', 'click');

	});

	it('the initialization of the google maps', function() {
		initialize();
		expect(google.maps.Map).toHaveBeenCalledWith(document.getElementById('mapCanvas'), {
			zoom : 15,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});
		expect(google.maps.LatLng).toHaveBeenCalledWith(position.coords.latitude, position.coords.longitude);
		expect(googleGeocoder.geocode).toHaveBeenCalledWith({
			'latLng' : googleMapLatLng
		}, new jasmine.Matchers.Any(Function));
		expect(google.maps.Marker).toHaveBeenCalledWith({
			position : googleMapLatLng,
			map : googleMap,
			icon : 'img/map_user.png',
			draggable : true
		});
		expect(googleMap.setCenter).toHaveBeenCalledWith(googleMapLatLng);
		expect(google.maps.event.addListener).toHaveBeenCalledWith(googleMapMarker, 'dragend', jasmine.any(Function));

	});

	it('la direccion encontrada es la correcta', function() {
		setFixtures("<input id='txtDireccion' />")
		spyOn($.fn, "val").andReturn("bar");
		obtenerDir();
		expect($('#txtDireccion').val).toHaveBeenCalledWith('calle 116 # 14-');
	});
	
	function geocodeCallback(address, callback) {
		var results;

		results = [{
			formatted_address : 'calle 116 # 14-45'
		}];
		callback(results, google.maps.GeocoderStatus.OK);
	}

});

