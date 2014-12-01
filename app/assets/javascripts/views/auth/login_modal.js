RingerPinger.Views.LoginModal = Backbone.CompositeView.extend({
	
	template: JST["auth/login_form"],

	initialize: function(options) {
	
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})