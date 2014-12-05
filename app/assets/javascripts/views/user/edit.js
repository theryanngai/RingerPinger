RingerPinger.Views.EditUser = Backbone.CompositeView.extend({
	
	template: JST["user/edit"],

	events: {
		'submit': 'updateUser'
	},

	initialize: function() {
		this.addNavBar();
		this.addFooter();

		this.listenTo(RingerPinger.currentUser, "sync", this.render);
	},

	className: 'edit-user',

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addNavBar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
		return navBarView;
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer();
		this.addSubview('.main-footer', footerView);
	},	

	updateUser: function(event) {
		event.preventDefault();
		var newAttrs = $('#update_user_form').serializeJSON().user;
		var editedUser = new RingerPinger.Models.User({ id: RingerPinger.currentUser.id});
		editedUser.set(newAttrs);
		debugger;

		editedUser.save({}, {
			success: function(model) {
				RingerPinger.currentUser.fetch();
				Backbone.history.navigate('#/user/' + model.id, { trigger: true });
			}
		});
	}
})