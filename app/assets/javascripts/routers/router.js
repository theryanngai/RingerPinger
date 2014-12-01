RingerPinger.Routers.Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		"profiles": "profilesIndex",
		"users/new" : 'newUser'
	},

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	home: function() {
		var homeView = new RingerPinger.Views.Home();
		this._swapView(homeView);
	},

	profilesIndex: function() {
		RingerPinger.profiles.fetch();
		var indexView = new RingerPinger.Views.ProfilesIndex({ collection: RingerPinger.profiles});
		this._swapView(indexView);
	},

	newUser: function() {
		var model = new RingerPinger.Models.User;
		var view = new RingerPinger.Views.UserForm({ model: model });
	},

	_swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		}

		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
	}
});