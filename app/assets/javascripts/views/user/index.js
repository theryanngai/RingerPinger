RingerPinger.Views.UsersIndex = Backbone.CompositeView.extend({
	
	template: JST["user/index"],

	events: {
		'click #map-find' : 'filterResults'
	},

	initialize: function() {
		this.addNavbar();
		this.addFooter();

		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(RingerPinger.users, "newSearch", this.filterResults);
		this.listenTo(this.collection, "addGeocode", this.addGeocode);
		this.listenTo(this.collection, "addMarkers", this.addMarkers);
		this.addMap();
	},

	render: function() {
		var content = this.template({ users: RingerPinger.users });
		this.$el.html(content);
		this.addLocalRingers(RingerPinger.users);
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
		this.mapView = new RingerPinger.Views.Map( { collection: this.collection });
		this.addSubview('#map-container', this.mapView);
	},

	addMarkers: function(options) {
		this.collection.forEach(function(ringer) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ringer.get('latitude'), 
																				 ringer.get('longitude')),
				map: RingerPinger.map,
				title: ringer.get('first_name')
			});
		});
	},

	addGeocode: function() {
		$('#map-input').geocomplete({
			map: $('#map-canvas'),	
		});
	}
})