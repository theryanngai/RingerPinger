RingerPinger.Views.UserShow = Backbone.CompositeView.extend({
	
	template: JST["user/show"],

	className: 'user-show',

	events: {
		'click #add-sport-link':'showAddSport',
		'click #delete_sport' : 'deleteSport'
	},

	initialize: function() {
		this.addNavbar();
		this.addFooter();
		this.addSportModal();

		this.listenTo(this.model, "sync", this.render);
		this.listenTo(RingerPinger.currentUser, "sync", this.render);
		this.listenTo(RingerPinger.usersports, "sync", this.render);
		this.listenTo(RingerPinger.sports, "sync", this.render);
	},

	className: 'user-show',

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		this.attachSubviews();
		this.addAutocomplete();
		return this;
	},

	addAutocomplete: function() {
		var availableSports = RingerPinger.sports.pluck('name');

		this.$("#usersport_sport_name").autocomplete({
   		source: availableSports
		});

		this.$('#usersport_sport_name').attr('autocomplete', 'on');
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
	},

	deleteSport: function(event) {
		var sport_id = parseInt(event.target.classList[0]);

		RingerPinger.usersports.fetch({
			success: function() {
				var model = RingerPinger.usersports.where({ user_id: RingerPinger.currentUser.id, 
																										sport_id: sport_id
																									})[0]
				model.destroy();
				RingerPinger.currentUser.fetch();
				Backbone.history.loadUrl(Backbone.history.fragment);
			}
		});
	}
})