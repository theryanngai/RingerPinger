RingerPinger.Views.Footer = Backbone.CompositeView.extend({
	template: JST['home/pieces/footer'],

	initialize: function(options) {
	},

	events: {
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
})