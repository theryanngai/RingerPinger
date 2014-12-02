RingerPinger.Views.HomeNavBar = Backbone.CompositeView.extend({
	template: JST['home/pieces/navbar'],

	initialize: function(options) {
		this.$homeEl = options.$homeEl;
		if (RingerPinger.currentUser) {
			this.addUserDropdown();
		} else {
			this.addSignupBox();
			this.addLoginBox();
		}
	},

	events: {
		'click .signup-link': 'showSignUp',
		'click .login-link':'showLogin',
		'click .log-out': 'logOutUser'
	},

	render: function() {
		var content = this.template(); 
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	showSignUp: function(event) {
		event.preventDefault();
		$('.signup-modal').addClass('signup-show');
		$('.login-modal').removeClass('login-show');
		this.$homeEl.addClass('darkened');
	},

	addSignupBox: function() {
		var signupBox = new RingerPinger.Views.SignupModal;
		this.addSubview('.signup', signupBox);
	},

	addLoginBox: function() {
		var loginBox = new RingerPinger.Views.LoginModal;
		this.addSubview('.login', loginBox);
	},

	showLogin: function(event) {
		event.preventDefault();
		RingerPinger.users.fetch();
		$('.login-modal').addClass('login-show');
		$('.signup-modal').removeClass('signup-show');
		this.$homeEl.addClass('darkened');
	},

	logOutUser: function(event) {
		event.preventDefault();

    $.ajax({
      url: "/api/session",
      type: "DELETE",
      data: RingerPinger.currentUser,
      success: function (model) {
        RingerPinger.currentUser = null;
        Backbone.history.navigate('#/', { trigger: true });
      }
    })
	},

	addUserDropdown: function(event) {
	}

})