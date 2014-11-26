RingerPinger.Views.HomeSearchBar = Backbone.CompositeView.extend({
	template: JST['home/pieces/search_bar'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})