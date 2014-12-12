RingerPinger.Routers.Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'users': 'usersIndex',
		'user/edit': 'editUser',
		'user/addsport': 'newUserSport',
		'user/:id': 'showUser',
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
		$('.datepicker').datepicker({
			dateFormat: 'yy/mm/dd'
		});
		$('.search-location').geocomplete();
	},

	newEvent: function() {
		if (!RingerPinger.currentUser) {
			this.redirectToLogin();
		} else {
			var newEventView = new RingerPinger.Views.NewEvent();
			this._swapView(newEventView);
			$('.datepicker').datepicker({
				dateFormat: 'yy/mm/dd'
			});
			$('#map-input').geocomplete();
			$('#map-canvas').addClass('new-event-map');	
		}
	},

	newUserSport: function() {
		if (!RingerPinger.currentUser) {
			this.redirectToLogin();
		} else {
			var newUserSportView = new RingerPinger.Views.NewUserSport();
			this._swapView(newUserSportView);
		}
	},

	showEvent: function(id) {
		if (!RingerPinger.currentUser) {
			this.redirectToLogin();
		} else {
			var sportsEvent = RingerPinger.events.getOrFetch(id);
			var eventShow = new RingerPinger.Views.EventShow({ model: sportsEvent });
			this._swapView(eventShow);
		}
	},

	showUser: function(id) {
		if (!RingerPinger.currentUser) {
			this.redirectToLogin();
		} else {
			RingerPinger.sports.fetch();
			var user = RingerPinger.users.getOrFetch(id);
			var userShowView = new RingerPinger.Views.UserShow({ model: user });
			this._swapView(userShowView);
		}
	},

	editUser: function() {
		if (!RingerPinger.currentUser) {
			this.redirectToLogin();
		} else {
			RingerPinger.currentUser.fetch();
			var editUserView = new RingerPinger.Views.EditUser({ model: RingerPinger.currentUser });
			this._swapView(editUserView);
			setTimeout(function() {
				$('#user_location').geocomplete();
			}, 500);
		}
	},

	eventsIndex: function() {
		if (!RingerPinger.currentUser) {
			this.redirectToLogin();
		} else {
			RingerPinger.events.fetch();
			var eventsIndexView = new RingerPinger.Views.EventsIndex({ collection: RingerPinger.events });
			this._swapView(eventsIndexView);
			RingerPinger.events.trigger("addMarkers");
			$('#map-canvas').addClass('user-index-map');
			$('#map-input').geocomplete();
		}
	},

	usersIndex: function() {
		if (!RingerPinger.currentUser) {
			this.redirectToLogin();
		} else {
			RingerPinger.users.fetch();
			var indexView = new RingerPinger.Views.UsersIndex({ collection: RingerPinger.users });
			this._swapView(indexView);
			RingerPinger.users.trigger("addMarkers");
			$('#map-canvas').addClass('user-index-map');
			$('#map-input').geocomplete();
		}
	},

	redirectToLogin: function() {
		Backbone.history.navigate('', { trigger: true });
		alert('Please log in first!');
	},

	_swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		}

		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
	}
});