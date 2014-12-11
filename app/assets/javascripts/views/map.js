RingerPinger.Views.Map = Backbone.CompositeView.extend({
	
	template: JST["map"],

	className: 'map-box',

	initialize: function() {
		this.geocoder = new google.maps.Geocoder();
    this.location = this.parseURI("location");

    if (!this.location) {
		  this.location = 'San Francisco, CA';
		}

		this.setDates();
		this.parseLocation();

		this.listenTo(this.collection, 'newLocation', this.changeLocation);
	},

	initializeMap: function() {
    this.map = new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);
    RingerPinger.map = this.map
    google.maps.event.addListener(this.map, 'idle', this.setSearch.bind(this));
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

  setDates: function() {
  	if (!this.start_date || !this.end_date) {
  		this.start_date = new Date(new Date() - (24*60*60*1000)*14);
  		this.end_date = new Date(new Date() + (24*60*60*1000)*14);
  	} else {
  		this.start_date = new Date(this.start_date);
  		this.end_date = new Date(this.end_date);
  	}
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
  	this.setDates();
  	var options = {
  		boundaries: boundaries,
  		start_date: this.start_date,
  		end_date: this.end_date,
  		sport: this.sport
  	};
  	this.collection.trigger("newSearch", options);
  },
})