RingerPinger.Routers.Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		"profiles": "profilesIndex",
		'events/new': 'newEvent'
	},

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	home: function() {
		var homeView = new RingerPinger.Views.Home();
		this._swapView(homeView);
	},

	newEvent: function() {
		var newEventView = new RingerPinger.Views.NewEvent();
		this._swapView(newEventView);
	},

	profilesIndex: function() {
		RingerPinger.profiles.fetch();
		var indexView = new RingerPinger.Views.ProfilesIndex({ collection: RingerPinger.profiles});
		this._swapView(indexView);
	},

	_swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		}

		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
	}
});