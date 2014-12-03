RingerPinger.Views.EventsIndex = Backbone.CompositeView.extend({
	
	template: JST["events/index"],

	initialize: function() {
		this.addNavbar();
		this.addFooter();
		this.addMap();

		this.listenTo(RingerPinger.events, "sync", this.render);
	},

	render: function() {
		var content = this.template({ events: RingerPinger.events });
		this.$el.html(content);
		this.attachSubviews();
		return this;
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