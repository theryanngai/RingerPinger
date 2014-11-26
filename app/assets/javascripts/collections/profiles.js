RingerPinger.Collections.Profiles = Backbone.Collection.extend({
	model: RingerPinger.Models.Profile,

	url:"/api/profiles",

	initialize: function(options) {
	}
})

RingerPinger.profiles = new RingerPinger.Collections.Profiles;