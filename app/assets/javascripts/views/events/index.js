RingerPinger.Views.EventsIndex = Backbone.CompositeView.extend({
	
	template: JST["events/index"],

	events: {
		'click #map-find' : 'filterResults',
		'click #submit-event-filter' : 'filterResults',
		'click .noUiSlider' : 'updateCaption',
		'keypress #event-sport-filter' : 'filterSport',
		'change #event-start-filter' : 'onPageFilterDate',
		'change #event-end-filter' : 'onPageFilterDate'
	},

	initialize: function(options) {
		this.startDate = null;
		this.endDate = null;
		this.sport = null;

		this.addNavbar();
		this.addFooter();

		this.listenTo(this.collection, "newSearch", this.filterResults);
		this.listenTo(this.collection, "addGeocode", this.addGeocode);
	},

	filterSport: function(event) {
		if (event.which === 13) {
			alert("butts");
		}
	},

	onPageFilterDate: function(event) {
		debugger;
	},

	filterDate: function(startDate, endDate) {
		if (startDate && endDate) {
			return new RingerPinger.Collections.Events(
				this.collection.filter(function(sportsEvent) {
					return (new Date(sportsEvent.get('event_date')) > new Date(startDate) &&
								new Date(sportsEvent.get('event_date')) < new Date(endDate));
				})
			)
		} else {
			return this.collection;
		}
		alert('butts');
	},

	filterSkill: function(collection, skillLevel) {
		if (skillLevel) {
			return new RingerPinger.Collections.Events(
				collection.where({ skill_level: skillLevel })
			)
		} else {
			return collection;
		}
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

  parseAll: function() {
  	this.location = this.parseURI("location");
  	this.startDate = this.parseURI("start_date");
  	this.endDate = this.parseURI("end_date");
  	this.sport = this.parseURI("sport");
  },

	updateCaption: function(event) {
		var value = parseInt($('#slider-value').val())

		if (value === 1) {
			$('#skill-level-marker').html('ROOKIE');
		} else if (value === 2) {
			$('#skill-level-marker').html('AMATEUR');
		} else if (value === 3) {
			$('#skill-level-marker').html('VETERAN');
		} else {
			$('#skill-level-marker').html('ALL-STAR');
		}
	},

	filterResults: function(options) {
		if ($(options.target).serializeJSON().event) {
			options = $(options.target).serializeJSON().event;
		}

		if (options.boundaries) {
			this.boundaries = options.boundaries;
		} 

		var that = this;

		var filteredEvents = RingerPinger.events.filter(function(sportsEvent) {
			return (sportsEvent.get('latitude') < that.boundaries.north &&
							sportsEvent.get('latitude') > that.boundaries.south &&
							sportsEvent.get('longitude') < that.boundaries.east &&
							sportsEvent.get('longitude') > that.boundaries.west)
						})
		filteredEvents = new RingerPinger.Collections.Events(filteredEvents);
		RingerPinger.events.trigger("refreshEvents", filteredEvents);
	},

	render: function(collection) {
		var content = this.template({ events: RingerPinger.events });
		this.$el.html(content);
		if (this.isSearched()) {
			this.processSearch();
		} else {
			this.addLocalEvents(RingerPinger.events);
			this.addMap(RingerPinger.events);
		}
		this.attachSubviews();
		this.addDatepicker();
		return this;
	},

	isSearched: function() {
		if (window.location.hash.substring(8)[0] === '?') {
			return true;
		} 
		return false;
	},

	processSearch: function() {
		this.parseAll();
		var dateFiltered = this.collection.filterDate(this.startDate, this.endDate);
		dateFiltered = new RingerPinger.Collections.Events(dateFiltered);
		var dateAndSportFiltered = this.collection.filterSport(dateFiltered, this.sport);
		dateAndSportFiltered = new RingerPinger.Collections.Events(dateAndSportFiltered);
		var content = this.template({ events: RingerPinger.events });
		this.$el.html(content);
		if (dateAndSportFiltered.models.length === 0) {
			var alert = "Your search returned no results. Here's everything nearby!";
			this.addLocalEvents(RingerPinger.events, alert);
		} else {
			this.addLocalEvents(dateAndSportFiltered);
		}
		this.addMap(dateAndSportFiltered);
	},

	addLocalEvents: function(collection, alert) {
		var localEventView = new RingerPinger.Views.LocalEvents({ collection: collection, 
																															alert: alert});
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
			start: 0,
			range: {
				'min': 0,
				'25%': 1,
				'50%': 2,
				'75%': 3,
				'max': 4
			},
			snap: true
		});

		this.$('.noUiSlider').Link('lower').to(this.$('#slider-value'));
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer;
		this.addSubview('.main-footer', footerView);
	},

	addMap: function(collection) {
		this.mapView = new RingerPinger.Views.Map( { collection: collection });
		this.addSubview('#map-container', this.mapView);
	},

	addGeocode: function() {
		$('#map-input').geocomplete({
			map: $('#map-canvas'),	
		});
	}
})