RingerPinger.Views.EventShow = Backbone.CompositeView.extend({
	
	template: JST["events/show"],

	events: {
	},

	initialize: function() {
		this.addNavBar();

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

})