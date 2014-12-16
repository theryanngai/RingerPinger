RingerPinger.Views.LocalEvents = Backbone.CompositeView.extend({
	
	template: JST["events/local_events"],

	initialize: function(options) {
		this.alert = options.alert;
		this.listenTo(RingerPinger.events, "refreshEvents", this.render);
	},

	render: function(filteredEvents) {
		if (filteredEvents) {
			var content = this.template({ events: filteredEvents, alert: this.alert });
		} else {
			var content = this.template({ events: this.collection, alert: this.alert });
		}
		this.$el.html(content);   
		return this;
	},
})