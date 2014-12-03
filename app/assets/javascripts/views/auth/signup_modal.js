RingerPinger.Views.SignupModal = Backbone.CompositeView.extend({
	
	template: JST["auth/signup_form"],

	events: {
		'click #signup-hide': 'hideSignUp',
		'submit #signup-form': 'createAccount',
	},

	initialize: function(options) {
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	hideSignUp: function(event) {
		event.preventDefault();
		$('.signup-modal').removeClass('signup-show');
	},

	createAccount: function(event) {
		event.preventDefault();
		var newAttrs = $('#signup-form').serializeJSON();
		var newUser = new RingerPinger.Models.User;
		newUser.set(newAttrs.user);
		newUser.save({}, {
			success: function(model) {
				var that = this;
				$.ajax({
		      url: "/api/session",
		      type: "POST",
		      data: newAttrs,
		      success: function (model) {
		        that.$('.signup-modal').removeClass('signup-show');
		        RingerPinger.currentUser = model;
		        Backbone.history.loadUrl(Backbone.history.fragment);
		      }
		    })
			}
		});
	},
})