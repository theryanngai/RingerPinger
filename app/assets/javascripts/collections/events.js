RingerPinger.Collections.Events = Backbone.Collection.extend({
	model: RingerPinger.Models.Event,

	url:"/api/events",

	initialize: function(options) {
	},

	getOrFetch: function(id) {
		var sportsEvent = RingerPinger.events.get(id);
		if (sportsEvent) {
			sportsEvent.fetch();
		} else {
			sportsEvent = new RingerPinger.Models.Event({ id: id });
			sportsEvent.fetch({
				success: function() {
					RingerPinger.events.add(sportsEvent);
				}
			});
		}

		return sportsEvent;
	}
})

RingerPinger.events = new RingerPinger.Collections.Events;