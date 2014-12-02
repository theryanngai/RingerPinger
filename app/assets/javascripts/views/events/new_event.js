RingerPinger.Views.NewEvent = Backbone.CompositeView.extend({
	
	template: JST["events/new"],

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
	}
})