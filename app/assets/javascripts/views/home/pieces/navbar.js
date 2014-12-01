RingerPinger.Views.HomeNavBar = Backbone.CompositeView.extend({
	template: JST['home/pieces/navbar'],

	initialize: function(options) {
		this.$homeEl = options.$homeEl;
		this.addSignupBox();
		// this.addLoginBox();
	},

	events: {
		'click .signup-link': 'showSignUp',
		'click #signup-hide': 'hideSignUp'
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
	}

})