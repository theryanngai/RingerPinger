RingerPinger.Collections.Users = Backbone.Collection.extend({
	model: RingerPinger.Models.User,

	url:"/api/users",

	initialize: function(options) {
	},

	getOrFetch: function(id) {
		var user = RingerPinger.users.get(id);
		if (user) {
			user.fetch();
		} else {
			user = new RingerPinger.Models.User({ id: id });
			user.fetch({
				success: function() {
					RingerPinger.users.add(user);
				}
			});
		}

		return user;
	}
})

RingerPinger.users = new RingerPinger.Collections.Users;