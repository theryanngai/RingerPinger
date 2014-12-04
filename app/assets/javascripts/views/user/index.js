RingerPinger.Views.UsersIndex = Backbone.CompositeView.extend({
	
	template: JST["user/index"],

	events: {
		'click #map-find' : 'doShit'
	},

	initialize: function() {
		this.addNavbar();
		this.addFooter();
		this.addMap();

		this.listenTo(RingerPinger.users, "sync", this.render);
	},

	render: function() {
		var content = this.template({ users: RingerPinger.users });
		this.$el.html(content);   
		this.attachSubviews();
		return this;
	},

	doShit: function(event) {
		alert("butts");
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