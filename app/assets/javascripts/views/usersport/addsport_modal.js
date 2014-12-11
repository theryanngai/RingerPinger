RingerPinger.Views.AddSportModal = Backbone.CompositeView.extend({
	
	template: JST["usersport/addsport_form"],

	events: {
		'click #addsport-hide': 'hideAddSport',
		'click #addsport-btn': 'addSport'
	},

	initialize: function(options) {
		RingerPinger.sports.fetch();
		this.listenTo(RingerPinger.currentUser, "sync", this.render);
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	hideAddSport: function(event) {
		event.preventDefault();
		$('.addsport-modal').removeClass('addsport-show');
	},

	addSport: function(event) {
		event.preventDefault();
		var attrs = $('#addsport-form').serializeJSON().usersport;
		var sport = RingerPinger.sports.findWhere({ name: attrs.sport_name });
		var newUserSport = new RingerPinger.Models.Usersport({ user_id: RingerPinger.currentUser.id,
																														 skill: attrs.skill_level });
		if (sport) {
			newUserSport.set({ sport_id: sport.get('id') });
			newUserSport.save({}, {
				success: function() {
					RingerPinger.currentUser.fetch();
				}
			})
		} else {
			sport = new RingerPinger.Models.Sport({ name: attrs.sport_name });
			var that = this;
			sport.save({}, {
				success: function(model) {
					newUserSport.set({ sport_id: model.get('id')})
					that.createUserSport(newUserSport);
					RingerPinger.usersports.fetch();
					RingerPinger.sports.fetch();
					Backbone.history.loadUrl(Backbone.history.fragment);
				}
			});
		}
	},

	createUserSport: function(newUserSport) {
		newUserSport.save({}, {
			success: function(model) {
				RingerPinger.usersports.fetch();
				RingerPinger.currentUser.fetch();
				Backbone.history.loadUrl(Backbone.history.fragment);
			}, error: function(model) {
				alert(newUserSport.errors);
			}
		});
	}
})