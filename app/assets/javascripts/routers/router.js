RingerPinger.Routers.Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		"profiles": "profilesIndex",
		'events/new': 'newEvent',
		'events/:id': 'showEvent'
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

	showEvent: function(id) {
		var sportsEvent = RingerPinger.events.getOrFetch(id);
		var eventShow = new RingerPinger.Views.EventShow({ model: sportsEvent });
		this._swapView(eventShow);
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