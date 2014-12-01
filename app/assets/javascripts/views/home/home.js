RingerPinger.Views.Home = Backbone.CompositeView.extend({
	
	template: JST["home/home"],

	className: 'index-content',

	initialize: function() {
		this.addNavbar();
		this.addSearchbar();
		this.addPanels();
		this.addSliders();
		this.addFooter();

		this.listenTo(RingerPinger.users, 'sync', this.rerender);
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addNavbar: function() {
		if (RingerPinger.currentUser) {
			var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el, loggedIn: true });
		} else {
			var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el, loggedIn: false});
		}
		this.addSubview('.navbar', navBarView);
	},

	addSearchbar: function() {
		var searchBarView = new RingerPinger.Views.HomeSearchBar;
		this.addSubview('#search-bar', searchBarView);
	},

	addPanels: function() {

	},

	addSliders: function() {

	},

	addFooter: function() {

	}
})