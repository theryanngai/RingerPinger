RingerPinger.Views.HomeNavBar = Backbone.CompositeView.extend({
	template: JST['home/pieces/_navbar'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})