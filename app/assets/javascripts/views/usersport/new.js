RingerPinger.Views.NewUserSport = Backbone.CompositeView.extend({
	
	template: JST["usersport/new"],

	events: {
		'submit': 'createUserSport'
	},

	initialize: function() {
		this.addNavBar();
		this.addFooter();
		this.addSportModal();
	},

	className: 'new-usersport',

	render: function() {
		var content = this.template();
		this.$el.html(content);
		var that = this;
    
    this.$("#map-find").click(function(){
      $("#map-input").trigger("geocode");
      return false;
    });

		this.attachSubviews();
		return this;
	},

	addNavBar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
		return navBarView;
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer();
		this.addSubview('.main-footer', footerView);
	},	

	addSportModal: function() {
		var addSportModal = new RingerPinger.Views.AddSportModal;
		this.addSubview('.addsport', addSportModal);
	},

	createEvent: function(event) {
		event.preventDefault();
		if (!RingerPinger.currentUser) {
			
			this.navBar.showLogin(event);
		} else {
			var newAttrs = $('#event-form').serializeJSON();
			var newEvent = new RingerPinger.Models.Event({ 
																				user_id: RingerPinger.currentUser.id,
																				location: newAttrs.map.input
																			});
			newAttrs.event.max_players = parseInt(newAttrs.event.max_players);
			newEvent.set(newAttrs.event);
			newEvent.save({}, {
				success: function(model) {
					RingerPinger.events.fetch();
					Backbone.history.navigate('#/events/' + model.id, { trigger: true });
				}
			});
		}
	}
})