RingerPinger.Views.LocalEvents = Backbone.View.extend({
	
	template: JST["events/local_events"],

	initialize: function(options) {
		this.listenTo(this.collection, "sync", this.render);
	},

	render: function() {
		var content = this.template({ events: this.collection });
		this.$el.html(content);   
		return this;
	},
})