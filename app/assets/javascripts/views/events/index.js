RingerPinger.Views.EventsIndex = Backbone.CompositeView.extend({
	
	template: JST["events/index"],

	events: {
		'click #map-find' : 'filterResults'
	},

	initialize: function(options) {
		this.addNavbar();
		this.addFooter();

		this.listenTo(this.collection, "newSearch", this.filterResults);
		this.listenTo(this.collection, "addGeocode", this.addGeocode);
		this.listenTo(this.collection, "addMarkers", this.addMarkers);
		this.listenTo(this.collection, "refreshEvents", this.render);


		this.addMap();
	},

	filterResults: function(options) {
		if (options.boundaries) {
			this.boundaries = options.boundaries;
		} 
		if (options.start_date) {
			this.start_date = options.start_date;
		}
		if (options.end_date) {
			this.end_date = options.end_date;
		}
		if (options.sport) {
			this.sport = options.sport;
		}

		var that = this;

		var filteredEvents = RingerPinger.events.filter(function(sportsEvent) {
			return (sportsEvent.get('latitude') < that.boundaries.north &&
							sportsEvent.get('latitude') > that.boundaries.south &&
							sportsEvent.get('longitude') < that.boundaries.east &&
							sportsEvent.get('longitude') > that.boundaries.west &&
							new Date(sportsEvent.get('event_date')) > that.start_date &&
							new Date(sportsEvent.get('event_date')) < that.end_date);
		})
		RingerPinger.filteredEvents = new RingerPinger.Collections.Events(filteredEvents);
		this.collection.trigger("refreshEvents", RingerPinger.filteredEvents);
	},

	addMarkers: function(options) {
		this.collection.forEach(function(sportsEvent) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(sportsEvent.get('latitude'), 
																				 sportsEvent.get('longitude')),
				map: RingerPinger.map,
				title: sportsEvent.get('title'),
				animation: google.maps.Animation.DROP
			});
		});
	},

	render: function(collection) {
		var content = this.template({ events: RingerPinger.events });
		this.$el.html(content);
		if (collection) {
			this.addLocalEvents(collection);
		} else {
			this.addLocalEvents(RingerPinger.events);
		}
		this.attachSubviews();
		this.addDatepicker();
		return this;
	},

	addLocalEvents: function(collection) {
		var localEventView = new RingerPinger.Views.LocalEvents({ collection: collection });
		this.$('.local-events').html(localEventView.render().$el);
	},

	addNavbar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addDatepicker: function() {
		this.$('.datepicker').each(function() {
			$(this).datepicker({
				dateFormat: 'yy/mm/dd'
			});
		});

		this.$('.noUiSlider').noUiSlider({
			start: 1,
			range: {
				'min':[0],
				'max':[100]
			}
		});
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer;
		this.addSubview('.main-footer', footerView);
	},

	addMap: function() {
		this.mapView = new RingerPinger.Views.Map( { collection: this.collection });
		this.addSubview('#map-container', this.mapView);
	},

	addGeocode: function() {
		$('#map-input').geocomplete({
			map: $('#map-canvas'),	
		});
	}
})