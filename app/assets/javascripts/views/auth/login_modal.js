RingerPinger.Views.LoginModal = Backbone.CompositeView.extend({
	
	template: JST["auth/login_form"],

	events: {
		'click #login-hide': 'hideLogin',
		'click #login-btn': 'loginUser'
	},

	initialize: function(options) {
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	hideLogin: function(event) {
		event.preventDefault();
		$('.login-modal').removeClass('login-show');
	},

	loginUser: function(event) {
		event.preventDefault();
		var attrs = $('#login-form').serializeJSON();
		var that = this;

    $.ajax({
      url: "/api/session",
      type: "POST",
      data: attrs,
      success: function (model) {
        that.$('.login-modal').removeClass('login-show');
        RingerPinger.currentUser = new RingerPinger.Models.User(model);
        Backbone.history.loadUrl(Backbone.history.fragment);
        RingerPinger.users.trigger("refresh");
      },
      error: function (model) { 
      	alert('Bad Username/Password Combo');
      }
    })
	}
})