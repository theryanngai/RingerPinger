RingerPinger.Views.NewProfile = Backbone.CompositeView.extend({
	
	template: JST["profiles/new"],

	events: {
		'submit': 'createEvent'
	},

	initialize: function() {
		this.addNavBar();
		this.addFooter();
	},

	className: 'new-profile',

	render: function() {
		var content = this.template();
		this.$el.html(content);
		debugger;
		this.attachSubviews();
		return this;
	},

	addNavBar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer();
		this.addSubview('.main-footer', footerView);
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