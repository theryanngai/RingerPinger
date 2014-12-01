RingerPinger.Views.SignupModal = Backbone.CompositeView.extend({
	
	template: JST["auth/signup_form"],

	initialize: function(options) {
	
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})