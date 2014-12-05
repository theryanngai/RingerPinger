RingerPinger.Collections.Usersports = Backbone.Collection.extend({
	model: RingerPinger.Models.Usersport,

	url:"/api/usersports",

	initialize: function(options) {
	},
})

RingerPinger.usersports = new RingerPinger.Collections.Usersports;