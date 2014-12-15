RingerPinger.Views.LocalEvents = Backbone.View.extend({
	
	template: JST["events/local_events"],

	initialize: function(options) {
		this.alert = options.alert;
		this.listenTo(RingerPinger.events, "sync", this.render);
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(RingerPinger.events, "refreshEvents", this.render);
	},

	render: function(options) {
		if (options) {
			var content = this.template({ events: options });
		} else {
			var content = this.template({ events: this.collection });
		}
		this.$el.html(content);   
		return this;
	},
})