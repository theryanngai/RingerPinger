RingerPinger.Views.LocalRingers = Backbone.CompositeView.extend({
	
	template: JST["user/local_ringers"],

	initialize: function(options) {
		this.listenTo(RingerPinger.users, "sync", this.render);
	},

	render: function() {
		var content = this.template({ users: this.collection });
		this.$el.html(content);   
		this.attachSubviews();
		return this;
	},
})