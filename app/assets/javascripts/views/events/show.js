RingerPinger.Views.EventShow = Backbone.CompositeView.extend({
	
	template: JST["events/show"],

	events: {
		'click button': 'createEventUser'
	},

	initialize: function() {
		this.addNavBar();
		this.addFooter();

		this.listenTo(this.model, "sync", this.render);
	},

	className: 'event-show',

	render: function() {
		var content = this.template({ sportsEvent: this.model });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addNavBar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar-event-show', navBarView);
		return navBarView;
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer;
		this.addSubview('.main-footer', footerView);
	},

	createEventUser: function(event) {
		event.preventDefault();
		var newEventUser = new RingerPinger.Models.Eventuser({ user_id: RingerPinger.currentUser.id,
																													 event_id: this.model.get('id')
																												});
		var that = this;
		newEventUser.save({}, {
			success: function(model) {
				that.model.fetch();
			}
		});
	}
})