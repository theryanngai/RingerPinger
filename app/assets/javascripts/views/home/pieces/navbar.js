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
		'click .log-out': 'logOutUser',
		'click #toggle' : 'changeStatus'
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

	changeStatus: function(event) {
		event.preventDefault();
		
		if (RingerPinger.currentUser.escape('status') === "available") {
			RingerPinger.currentUser.set({ status: "unavailable"})
		} else {
			RingerPinger.currentUser.set({ status: "available" })
		}

		RingerPinger.currentUser.save({}, {
			success: function(model) {
				RingerPinger.currentUser.fetch();
        Backbone.history.loadUrl(Backbone.history.fragment);
			}
		});
	},

	logOutUser: function(event) {
		event.preventDefault();

    $.ajax({
      url: "/api/session",
      type: "DELETE",
      data: RingerPinger.currentUser.toJSON(),
      success: function (model) {
        RingerPinger.currentUser = null;
        Backbone.history.navigate('#/', { trigger: true });
      }
    })
	},

	addUserDropdown: function(event) {
	}

})