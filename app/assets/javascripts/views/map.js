RingerPinger.Views.Map = Backbone.CompositeView.extend({
	
	template: JST["map"],

	className: 'map-box',

	initialize: function() {
    this.allMarkers = [];
		this.geocoder = new google.maps.Geocoder();
    this.location = this.parseURI("location");

    if (!this.location) {
		  this.location = 'San Francisco, CA';
		}

		this.parseLocation();

		this.listenTo(this.collection, 'newLocation', this.changeLocation);
    this.listenTo(this.collection, 'addMarkers', this.addMarkers);
    this.listenTo(RingerPinger.events, 'refreshMarkers', this.refreshMarkers);
	},

	initializeMap: function() {
    this.map = new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);
    google.maps.event.addListener(this.map, 'idle', this.setSearch.bind(this));
    RingerPinger.map = this.map
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	parseURI: function(variable) {
		var query = Backbone.history.fragment.split('?').pop(0);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
      	if (/\S/.test(decodeURIComponent(pair[1]))) {
          return decodeURIComponent(pair[1]);
      	} else {
      		return undefined;
      	}
      }
    }
    console.log('Query variable %s not found', variable);
  },

  parseLocation: function() {
  	var that = this;
  	this.geocoder.geocode( {'address': this.location }, function (results, status) {
  		if (status == google.maps.GeocoderStatus.OK) {
  			that.coords = results[0].geometry.location;
  			that.mapOptions = {
  				center: that.coords,
  				zoom: 12
  			};
  			if (that.map) {
  				that.map.setCenter(that.coords);
  				that.setSearch();
  			} else {
  				that.initializeMap();
  			}
  		that.collection.trigger("addGeocode");
      that.collection.trigger("addMarkers");
  		}
  	})
  },

  changeLocation: function(params) {
  	this.location = params.location;
  	this.start_date = params.start_date;
  	this.end_date = params.end_date;
  	this.sport = params.sport;
  	this.parseLocation();
  },

  setSearch: function() {
  	var southWest = this.map.getBounds().getSouthWest();
  	var northEast = this.map.getBounds().getNorthEast();
  	var boundaries = {
  		south: southWest.lat(),
  		west: southWest.lng(),
  		north: northEast.lat(),
  		east: northEast.lng()
  	};
  	var options = {
  		boundaries: boundaries,
  	};
  	
    RingerPinger.events.trigger("newSearch", options);
  },

  addMarkers: function(options) {
    var that = this;
    this.collection.forEach(function(sportsEvent) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(sportsEvent.get('latitude'), 
                                         sportsEvent.get('longitude')),
        map: RingerPinger.map,
        title: sportsEvent.get('title'),
        animation: google.maps.Animation.DROP
      });
      that.allMarkers.push(marker);
    });
  },

  refreshMarkers: function(collection) {
    this.allMarkers.forEach(function(marker) {
      marker.setMap(null);
    });
    
    this.allMarkers = [];    
    collection.forEach(function(event) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(event.get('latitude'),
                                         event.get('longitude')),
        map: RingerPinger.map,
        title: event.get('title'),
        animation: google.maps.Animation.DROP
      });

      this.allMarkers.push(marker);
    }.bind(this));
  }
})