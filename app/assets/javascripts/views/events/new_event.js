RingerPinger.Views.NewEvent = Backbone.CompositeView.extend({
	
	template: JST["events/new"],

	events: {
		'submit': 'createEvent'
	},

	initialize: function() {
		this.addNavBar();
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
	},

	createEvent: function(event) {
		event.preventDefault();
		var newAttrs = $('#event-form').serializeJSON();
		var newUser = new RingerPinger.Models.User;
		newUser.set(newAttrs.user);
		newUser.save({}, {
			success: function(model) {
				RingerPinger.currentUser = model;
				RingerPinger.users.fetch();
				Backbone.history.loadUrl(Backbone.history.fragment);
			}
		});
	}
})