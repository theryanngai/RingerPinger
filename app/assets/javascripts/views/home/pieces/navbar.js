RingerPinger.Views.HomeNavBar = Backbone.CompositeView.extend({
	template: JST['home/pieces/navbar'],

	initialize: function(options) {
		this.$homeEl = options.$homeEl;
		this.addSignupBox();
		// this.addLoginBox();
	},

	events: {
		'click .signup-link': 'showSignUp',
		'click #signup-hide': 'hideSignUp',
		'click #signup-btn': 'createAccount'
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addSignupBox: function() {
		var signupBox = new RingerPinger.Views.SignupModal();
		this.addSubview('.signup', signupBox);
	},

	showSignUp: function(event) {
		event.preventDefault();
		$('.signup-modal').addClass('signup-show');
		this.$homeEl.addClass('darkened');
	},

	hideSignUp: function(event) {
		event.preventDefault();
		$('.signup-modal').removeClass('signup-show');
	},

	createAccount: function(event) {
		event.preventDefault();
		var newAttrs = $('#signup-form').serializeJSON();
		var newUser = new RingerPinger.Models.User;
		newUser.set(newAttrs);
		debugger;
		newUser.save({}, {
			success: function() {
				alert("YOU FUCKING SAVED ME");
			},
			error: function() {
				debugger;
				alert(newUser.error);
			}
		});
	}

})