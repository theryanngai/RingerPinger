RingerPinger.Views.Map = Backbone.CompositeView.extend({
	
	template: JST["map"],

	className: 'map-box',

	initialize: function() {
		this.geocoder = new google.maps.Geocoder();

		if (Backbone.history.fragment != "events") {
			this.location = this.parseURI("location");
			this.start_date = this.parseURI("start_date");
			this.end_date = this.parseURI("end_date");
			this.sport = this.parseURI("sport");
		} else {
			this.location = 'San Francisco, CA';
			this.start_date = '';
			this.end_date = '';
			this.sport = ''
		}

		this.setDates();
		this.parseLocation();
		debugger;

		this.mapOptions = {
      center: new google.maps.LatLng(37.7810556,-122.411455),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
	},

	initializeMap: function() {
    this.map = new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);
    google.maps.event.addListener(this.map, 'idle', this.setSearch.bind(this));
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);

		setTimeout(function() {
			this.initializeMap();
			google.maps.event.trigger(this.map, "resize");
		}.bind(this), 0)
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
  		this.start_date = new Date();
  		this.end_date = new Date();
  	} else {
  		this.start_date = new Date(this.start_date);
  		this.end_date = new Date(this.start_date);
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
  		}
  	})
  },

  setSearch: function() {
  	var southWest = this.map.getBounds().getSouthWest();
  	var northEast = this.map.getBounds().getnorthEast();
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