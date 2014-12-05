RingerPinger.Collections.Eventusers = Backbone.Collection.extend({
	model: RingerPinger.Models.Eventuser,

	url:"/api/eventusers",

	initialize: function(options) {
	},
})

RingerPinger.eventusers = new RingerPinger.Collections.Eventusers;