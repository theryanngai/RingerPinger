RingerPinger.Routers.Router = Backbone.Router.extend({
	routes: {
		"": "userIndex",
		"users/new" : 'newUser'
	},

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	userIndex: function() {
		RingerPinger.profiles.fetch();
		var indexView = new RingerPinger.Views.ProfilesIndex({ collection: RingerPinger.profiles});
		this._swapView(indexView);
	},

	newUser: function() {
		var model = RingerPinger.View
	},

	_swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		}

		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
	}
});