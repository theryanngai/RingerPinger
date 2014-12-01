RingerPinger.Collections.Users = Backbone.Collection.extend({
	model: RingerPinger.Models.User,

	url:"/api/users",

	initialize: function(options) {
	}
})

RingerPinger.users = new RingerPinger.Collections.Users;