RingerPinger.Views.LocalRingers = Backbone.View.extend({
	
	template: JST["user/local_ringers"],

	initialize: function(options) {
		// this.listenTo(this.collection, "sync", this.render);
	},

	render: function() {
		var content = this.template({ users: this.collection });
		this.$el.html(content);   
		return this;
	},
})