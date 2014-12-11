RingerPinger.Views.UsersIndex = Backbone.CompositeView.extend({
	
	template: JST["user/index"],

	events: {
		'click #map-find' : 'filterResults'
	},

	initialize: function() {
		this.addNavbar();
		this.addFooter();

		this.listenTo(this.collection, "newSearch", this.filterResults);
		this.listenTo(this.collection, "addGeocode", this.addGeocode);
		this.listenTo(this.collection, "addMarkers", this.addMarkers);
		this.listenTo(this.collection, "refreshEvents", this.render);

		this.addMap();
	},

	render: function(collection) {
		var content = this.template({ users: RingerPinger.users });
		this.$el.html(content);
		if (collection) {
			this.addLocalRingers(collection);
		} else {
			this.addLocalRingers(RingerPinger.users);
		}
		this.attachSubviews();
		return this;
	},

	filterResults: function(options) {
		if (options.boundaries) {
			this.boundaries = options.boundaries;
		} 
		if (options.available) {
			this.available = options.available;
		}

		var that = this;

		var filteredUsers = RingerPinger.users.filter(function(sportsEvent) {
			return (sportsEvent.get('latitude') < that.boundaries.north &&
							sportsEvent.get('latitude') > that.boundaries.south &&
							sportsEvent.get('longitude') < that.boundaries.east &&
							sportsEvent.get('longitude') > that.boundaries.west &&
							sportsEvent.get('status') === "available")
		});

		RingerPinger.filteredUsers = new RingerPinger.Collections.Users(filteredUsers);
		this.collection.trigger("refreshEvents", RingerPinger.filteredUsers);
	},

	addNavbar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addLocalRingers: function(collection) {
		var localRingerView = new RingerPinger.Views.LocalRingers({ collection: collection });
		this.$('.local-ringers').html(localRingerView.render().$el);
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