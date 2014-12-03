RingerPinger.Routers.Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'users': 'usersIndex',
		'users/:id': 'showUser',
		'events/new': 'newEvent',
		'events/:id': 'showEvent'
	},

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	home: function() {
		var homeView = new RingerPinger.Views.Home();
		this._swapView(homeView);
		$('.datepicker').datepicker();
		$('.search-location').geocomplete();
	},

	newEvent: function() {
		var newEventView = new RingerPinger.Views.NewEvent();
		this._swapView(newEventView);
		debugger;
		newEventView.mapView.initializeMap();
		$('#map-input').geocomplete({
			map: $('#map-canvas'),
		});
	},

	showEvent: function(id) {
		var sportsEvent = RingerPinger.events.getOrFetch(id);
		var eventShow = new RingerPinger.Views.EventShow({ model: sportsEvent });
		this._swapView(eventShow);
	},

	usersIndex: function() {
		RingerPinger.users.fetch();
		var indexView = new RingerPinger.Views.UsersIndex({ collection: RingerPinger.users});
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