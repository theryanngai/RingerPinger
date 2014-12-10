RingerPinger.Views.EventsIndex = Backbone.CompositeView.extend({
	
	template: JST["events/index"],

	events: {
		'click #map-find' : 'filterResults'
	},

	initialize: function(options) {
		this.addNavbar();
		this.addFooter();
		this.addMap();

		this.listenTo(RingerPinger.events, "sync", this.render);
		this.listenTo(RingerPinger.events, "newSearch", this.filterResults);
		this.listenTo(RingerPinger.events, "addGeocode", this.addGeocode);
	},

	filterResults: function(event) {
		if (this.$('#map-input').val() === "") {
			var filteredEvents = RingerPinger.events;
		} else {
			var filteredEvents = RingerPinger.events.where({ location: this.$('#map-input').val() });
		}
		var filteredContent = new RingerPinger.Views.LocalEvents({ collection: filteredEvents });
		this.$('.local-events').html(filteredContent.render().$el);
	},

	render: function() {
		var content = this.template({ events: RingerPinger.events });
		this.$el.html(content);
		this.addLocalEvents(RingerPinger.events);
		this.attachSubviews();

		return this;
	},

	addLocalEvents: function(collection) {
		var localEventView = new RingerPinger.Views.LocalEvents({ collection: collection });
		// this.addSubview('.local-events', localEventView
		this.$('.local-events').html(localEventView.render().$el);
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
		this.mapView = new RingerPinger.Views.Map( { collection: RingerPinger.events });
		this.addSubview('#map-container', this.mapView);
	},

	addGeocode: function() {
		alert("butts");
		debugger;
		// $('#map-input').geocomplete();
	}
})