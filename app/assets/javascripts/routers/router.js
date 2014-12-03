RingerPinger.Routers.Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'users': 'usersIndex',
		'users/:id': 'showUser',
		'events': 'eventsIndex',
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
		$('#map-input').geocomplete({
			map: $('#map-canvas'),
		});
		$('#map-canvas').addClass('new-event-map');
	},

	showEvent: function(id) {
		var sportsEvent = RingerPinger.events.getOrFetch(id);
		var eventShow = new RingerPinger.Views.EventShow({ model: sportsEvent });
		this._swapView(eventShow);
	},

	showUser: function(id) {
		var user = RingerPinger.users.getOrFetch(id);
		var userShow = new RingerPinger.Views.UserShow({ model: user });
		this._swapView(userShow);
	},

	eventsIndex: function() {
		RingerPinger.events.fetch();
		var eventsIndexView = new RingerPinger.Views.EventsIndex({ collection: RingerPinger.events });
		this._swapView(eventsIndexView);
		$('#map-input').geocomplete({
			map: $('#map-canvas'),
		});
		$('#map-canvas').addClass('user-index-map');
	},

	usersIndex: function() {
		RingerPinger.users.fetch();
		var indexView = new RingerPinger.Views.UsersIndex({ collection: RingerPinger.users});
		this._swapView(indexView);
		$('#map-input').geocomplete({
			map: $('#map-canvas'),
		});
		$('#map-canvas').addClass('user-index-map');
	},

	_swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		}

		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
	}
});