RingerPinger.Views.HomeNavBar = Backbone.CompositeView.extend({
	template: JST['home/pieces/navbar'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})