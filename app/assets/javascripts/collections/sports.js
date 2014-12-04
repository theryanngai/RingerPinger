RingerPinger.Collections.Sports = Backbone.Collection.extend({
	model: RingerPinger.Models.Sport,

	url:"/api/sports",

	initialize: function(options) {
	},

	getOrFetch: function(id) {
		var sport = RingerPinger.sports.get(id);
		if (sport) {
			sport.fetch();
		} else {
			sport = new RingerPinger.Models.Sport({ id: id });
			sport.fetch({
				success: function() {
					RingerPinger.sports.add(sport);
				}
			});
		}

		return sport;
	}
})

RingerPinger.sports = new RingerPinger.Collections.Sports;