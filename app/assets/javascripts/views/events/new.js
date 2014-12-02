RingerPinger.Views.NewEvent = Backbone.CompositeView.extend({
	
	template: JST["events/new"],

	events: {
		'submit': 'createEvent'
	},

	initialize: function() {
		this.navBar = this.addNavBar();
		this.addFooter();
		this.addMap();
	},

	className: 'new-event',

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
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
		this.addSubview('#map-canvas', mapView);
	},

	createEvent: function(event) {
		event.preventDefault();
		if (!RingerPinger.currentUser) {
			
			this.navBar.showLogin(event);
		} else {
			var newAttrs = $('#event-form').serializeJSON();
			var newEvent = new RingerPinger.Models.Event({ user_id: RingerPinger.currentUser.id});
			newAttrs.event.max_players = parseInt(newAttrs.event.max_players);
			debugger;
			newEvent.set(newAttrs.event);
			newEvent.save({}, {
				success: function(model) {
					RingerPinger.events.fetch();
					Backbone.history.navigate('events/' + model.id, { trigger: true });
				}
			});
		}
	}
})