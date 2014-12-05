RingerPinger.Views.UsersIndex = Backbone.CompositeView.extend({
	
	template: JST["user/index"],

	events: {
		'click #map-find' : 'filterResults'
	},

	initialize: function() {
		this.addNavbar();
		this.addFooter();
		this.addLocalRingers(RingerPinger.users);
		this.addMap();
	},

	render: function() {
		var content = this.template({ users: RingerPinger.users });
		this.$el.html(content);   
		this.attachSubviews();
		return this;
	},

	filterResults: function(event) {
		var filteredUsers = RingerPinger.users.where({ location: this.$('#map-input').val() });
		var filteredContent = new RingerPinger.Views.LocalRingers({ collection: filteredUsers });
		this.$('.local-ringers').html(filteredContent.render().$el);
	},

	addNavbar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addLocalRingers: function(collection) {
		var localRingerView = new RingerPinger.Views.LocalRingers({ collection: collection });
		this.addSubview('.local-ringers', localRingerView);
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