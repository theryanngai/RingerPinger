RingerPinger.Views.ProfilesIndex = Backbone.CompositeView.extend({ 
	template: JST["profiles/index"],

	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},

	render: function() {
		var content = this.template({ profiles : this.collection });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
});