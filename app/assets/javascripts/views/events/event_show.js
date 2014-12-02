RingerPinger.Views.EventShow = Backbone.CompositeView.extend({
	
	template: JST["events/show"],

	events: {
		'submit': 'createEvent'
	},

	initialize: function() {
		this.addNavBar();
	},

	className: 'event-show',

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addNavBar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar-event-show', navBarView);
		return navBarView;
	},

})