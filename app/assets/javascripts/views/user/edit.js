RingerPinger.Views.EditUser = Backbone.CompositeView.extend({
	
	template: JST["user/edit"],

	events: {
		'submit': 'updateUser'
	},

	initialize: function() {
		this.addNavBar();
		this.addFooter();
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
		var editedUser = new RingerPinger.Models.User({ 
																			id: RingerPinger.currentUser.id,
																		});
		editedUser.set(newAttrs);
		editedUser.save({}, {
			success: function(model) {
				RingerPinger.users.fetch();
				Backbone.history.navigate('#/users/' + model.id, { trigger: true });
			}
		});
	}
})