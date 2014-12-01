RingerPinger.Collections.Events = Backbone.Collection.extend({
	model: RingerPinger.Models.Event,

	url:"/api/events",

	initialize: function(options) {
	}
})

RingerPinger.events = new RingerPinger.Collections.Event;