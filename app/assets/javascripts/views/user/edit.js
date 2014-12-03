RingerPinger.Views.EditUser = Backbone.CompositeView.extend({
	
	template: JST["user/edit"],

	events: {
		'submit': 'updateUser'
	},

	initialize: function() {
		this.addNavBar();
		this.addFooter();
	},

	className: 'edit-user',

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

	updateUser: function(event) {
		event.preventDefault();
		if (!RingerPinger.currentUser) {
			
			this.navBar.showLogin(event);
		} else {
			var newAttrs = $('#event-form').serializeJSON();
			var newEvent = new RingerPinger.Models.Event({ 
																				user_id: RingerPinger.currentUser.id,
																				location: newAttrs.map.input
																			});
			newAttrs.event.max_players = parseInt(newAttrs.event.max_players);
			newEvent.set(newAttrs.event);
			newEvent.save({}, {
				success: function(model) {
					RingerPinger.events.fetch();
					Backbone.history.navigate('#/events/' + model.id, { trigger: true });
				}
			});
		}
	}
})