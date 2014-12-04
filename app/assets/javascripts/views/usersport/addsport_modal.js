RingerPinger.Views.AddSportModal = Backbone.CompositeView.extend({
	
	template: JST["usersport/addsport_form"],

	events: {
		'click #addsport-hide': 'hideAddSport',
		'click #addsport-btn': 'addSport'
	},

	initialize: function(options) {
	
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
		RingerPinger.sport.fetch();
		event.preventDefault();
		var attrs = $('#addsport-form').serializeJSON();
		debugger;
		var newUserSport = new RingerPinger.Models.Usersport({ user_id: RingerPinger.currentUser.id });
		newUserSport.set(attrs.usersport);
		debugger;
		newUserSport.save({}, {
			success: function(model) {
				var that = this;
				$.ajax({
		      url: "/api/usersports",
		      type: "POST",
		      data: attrs,
		      success: function (model) {
		        that.$('.addsport-modal').removeClass('addsport-show');
		        RingerPinger.usersports.add(model);
		        Backbone.history.loadUrl(Backbone.history.fragment);
		      }
		    })
			}
		});
	},
})