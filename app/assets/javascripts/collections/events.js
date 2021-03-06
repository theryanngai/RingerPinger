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
	},

	filterDate: function(startDate, endDate) {
		if (startDate && endDate) {
			var realStart = new Date(startDate);
			var realEnd = new Date(endDate);
			var filtered = this.filter(function(event) {
				return new Date(event.get('event_date')) > realStart &&
				new Date(event.get('event_date')) < realEnd;
			});
			return new RingerPinger.Collections.Events(filtered);
		} else {
			return this;
		}
	},

	filterSport: function(collection, sport) {
		if (collection && sport) {
			var filtered = collection.filter(function(event) {
				return event.get('sport') === sport;
			});
			return new RingerPinger.Collections.Events(filtered);
		} else {
			return collection;
		}
	}
})

RingerPinger.events = new RingerPinger.Collections.Events;