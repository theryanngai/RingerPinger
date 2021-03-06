RingerPinger.Views.EventsIndex = Backbone.CompositeView.extend({
	
	template: JST["events/index"],

	events: {
		'click #map-find' : 'filterResults',
		'click #submit-event-filter' : 'filterResults',
		'click .noUiSlider' : 'updateCaption',
		'keypress #event-sport-filter' : 'handleSportFilter',
		'change #event-start-filter' : 'handleDateFilter',
		'change #event-end-filter' : 'handleDateFilter',
		'change .noUiSlider' : 'onPageFilter'
	},

	initialize: function(options) {
		this.startDate = null;
		this.endDate = null;
		this.sport = null;

		this.addNavbar();
		this.addFooter();

		this.listenTo(RingerPinger.events, "newSearch", this.filterResults);
		this.listenTo(this.collection, "addGeocode", this.addGeocode);
	},

	onPageFilterSport: function(collection) {
		var searchVal = $('#event-sport-filter').val();

		if (searchVal === "") {
			var sportFiltered = collection;
			return collection;
		} else {
			var sportFiltered = collection.where({ sport: searchVal });
		}

		return new RingerPinger.Collections.Events(sportFiltered);
	},

	handleSportFilter: function(event) {
		if (event.which === 13) {
			this.onPageFilter();
		} 
	},

	handleDateFilter: function(event) {
		event.preventDefault();
		if (($('#event-end-filter').data().datepicker.selectedYear != 0) && 
				($('#event-start-filter').data().datepicker.currentYear != 0)) {
			this.onPageFilter(true);	
		} 
	},

	onPageFilterSkill: function(collection) {
		var value = parseInt($('.noUiSlider').val());

		if (value === 0) {
			var skillFiltered = collection;
			return skillFiltered;
		} else if (value === 1) {
			var skillFiltered = collection.where({ skill_level: "Rookie" });
		} else if (value === 2) {
			var skillFiltered = collection.where({ skill_level: "Amateur" });
		}	else if (value === 3) {
			var skillFiltered = collection.where({ skill_level: "Veteran" });
		} else {
			var skillFiltered = collection.where({ skill_level: "All-Star"});
		}

		return new RingerPinger.Collections.Events(skillFiltered);
	},

	onPageFilterDate: function() { 
		if (this.dateFilled()) {
			var startDate = new Date($('#event-start-filter').val());
			var endDate = new Date($('#event-end-filter').val());
			var dateFiltered = RingerPinger.events.filter(function(event) {
				return (new Date(event.get('event_date')) >= startDate &&
							 new Date(event.get('event_date')) <= endDate
							);
			})
			return new RingerPinger.Collections.Events(dateFiltered);
		} else {
			return RingerPinger.events;
		} 
	},

	dateFilled: function() {
		if ($('#event-start-filter').val() === "" ||
				$('#event-end-filter').val() === "") {
			return false;
		} else {
			return true;
		}
	},


	onPageFilter: function(event) {
		var resultCollection = this.onPageFilterDate();
		resultCollection = this.onPageFilterSport(resultCollection);
		resultCollection = this.onPageFilterSkill(resultCollection);
		RingerPinger.events.trigger('refreshEvents', resultCollection);
		RingerPinger.events.trigger('refreshMarkers', resultCollection);
		this.instanceCollection =  resultCollection;
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
		if (value === 0) {
			$('#skill-level-marker').html('ALL SKILLS');
		} else if (value === 1) {
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

		if (this.instanceCollection) {
			var coll = this.instanceCollection;
		} else {
			var coll = RingerPinger.events;
		}

		var filteredEvents = coll.filter(function(sportsEvent) {
			return (sportsEvent.get('latitude') < that.boundaries.north &&
							sportsEvent.get('latitude') > that.boundaries.south &&
							sportsEvent.get('longitude') < that.boundaries.east &&
							sportsEvent.get('longitude') > that.boundaries.west)
						})

		filteredEvents = new RingerPinger.Collections.Events(filteredEvents);
		RingerPinger.events.trigger("refreshEvents", filteredEvents);
	},

	render: function(collection) {
		var content = this.template();
		this.$el.html(content);
		if (this.isSearched()) {
			this.filtered = this.processSearch();
			this.addMap(this.filtered);
			this.instanceCollection = this.filtered;
		} else {
			this.addLocalEvents(RingerPinger.events);
			this.addMap(RingerPinger.events);
			this.instanceCollection = RingerPinger.events;
		}
		this.attachSubviews();
		this.addDatepicker();
		this.addAutocomplete();
		return this;
	},

	addAutocomplete: function() {
		RingerPinger.sports.fetch({
			success: function() {
				var availableSports = RingerPinger.sports.pluck('name');

				this.$("#event-sport-filter").autocomplete({
   				source: availableSports
   			});

  			this.$('#event-sport-filter').attr('autocomplete', 'on');
  		}.bind(this)
		});
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
		var dateAndSportFiltered = this.collection.filterSport(dateFiltered, this.sport);
		if (dateAndSportFiltered.models.length === 0) {
			var alert = "Your search returned no results. Here's everything!";
			this.addLocalEvents(RingerPinger.events, alert);
			return RingerPinger.events;
		} else {
			this.addLocalEvents(dateAndSportFiltered);
		}
		return dateAndSportFiltered;
	},

	addLocalEvents: function(collection, alert) {
		var localEventView = new RingerPinger.Views.LocalEvents({ collection: collection, 
																															alert: alert });
		this.addSubview('.local-events', localEventView);
	},

	addNavbar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addDatepicker: function() {
		this.$('.datepicker').each(function() {
			$(this).datepicker({
				dateFormat: 'yy/mm/dd',
				minDate: 0
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