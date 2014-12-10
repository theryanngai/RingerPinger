RingerPinger.Views.UserShow = Backbone.CompositeView.extend({
	
	template: JST["user/show"],

	className: 'user-show',

	events: {
		'click #add-sport-link':'showAddSport',
	},

	initialize: function() {
		this.addNavbar();
		this.addFooter();
		this.addSportModal();

		this.listenTo(this.model, "sync", this.render);
		this.listenTo(RingerPinger.currentUser, "sync", this.render);
		this.listenTo(RingerPinger.usersports, "sync", this.render);
	},

	className: 'user-show',

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addNavbar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer;
		this.addSubview('.main-footer', footerView);
	},

	addSportModal: function() {
		var addSportModal = new RingerPinger.Views.AddSportModal;
		this.addSubview('.addsport', addSportModal);
	},

	showAddSport: function(event) {
		event.preventDefault();
		RingerPinger.usersports.fetch();
		$('.addsport-modal').addClass('addsport-show');
	}
})