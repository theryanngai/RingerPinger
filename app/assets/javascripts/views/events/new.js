RingerPinger.Views.NewEvent = Backbone.CompositeView.extend({
	
	template: JST["events/new"],

	events: {
		'submit': 'createEvent'
	},

	initialize: function() {
		this.navBar = this.addNavBar();
		this.addFooter();
	},

	className: 'new-event',

	render: function() {
		var content = this.template();
		this.$el.html(content);
		var that = this;
    
    this.$("#map-find").click(function(){
      $("#map-input").trigger("geocode");
      return false;
    });

		this.attachSubviews();
		this.addAutocomplete();
		return this;
	},

	addAutocomplete: function() {
		RingerPinger.sports.fetch({
			success: function() {
				var availableSports = RingerPinger.sports.pluck('name');

				this.$("#event_sport").autocomplete({
	 				source: availableSports
	 			});

				this.$('#event_sport').attr('autocomplete', 'on');
			}.bind(this)
		});
	},

	addNavBar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
		return navBarView;
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer();
		this.addSubview('.main-footer', footerView);
	},	

	addMap: function() {
		var mapView = new RingerPinger.Views.Map();
		this.addSubview('#map-container', mapView);
	},

	createEvent: function(event) {
		event.preventDefault();
		var newAttrs = $('#event-form').serializeJSON();
		var newEvent = new RingerPinger.Models.Event({ 
																			user_id: RingerPinger.currentUser.id,
																			location: newAttrs.map.input
																		});
		newAttrs.event.max_players = parseInt(newAttrs.event.max_players);
		newEvent.set(newAttrs.event);
		debugger;
		newEvent.save({}, {
			success: function(model) {
				RingerPinger.events.fetch();
				Backbone.history.navigate('#/events/' + model.id, { trigger: true });
			}
		});
	}
})