RingerPinger.Views.EventsIndex = Backbone.CompositeView.extend({
	
	template: JST["events/index"],

	events: {
		'click #map-find' : 'filterResults'
	},

	initialize: function() {
		this.addNavbar();
		this.addFooter();
		this.addMap();
		this.addLocalEvents(RingerPinger.events);

		// this.listenTo(RingerPinger.events, "sync", this.render);
	},

	filterResults: function(event) {
		var filteredEvents = RingerPinger.events.where({ location: this.$('#map-input').val() });
		var filteredContent = new RingerPinger.Views.LocalEvents({ collection: filteredEvents });
		this.$('.local-events').html(filteredContent.render().$el);
	},

	render: function() {
		var content = this.template({ events: RingerPinger.events });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addLocalEvents: function(collection) {
		var localEventView = new RingerPinger.Views.LocalEvents({ collection: collection });
		this.addSubview('.local-events', localEventView);
	},

	addNavbar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer;
		this.addSubview('.main-footer', footerView);
	},

	addMap: function() {
		this.mapView = new RingerPinger.Views.Map();
		this.addSubview('#map-container', this.mapView);
	},
})