RingerPinger.Views.NewEvent = Backbone.CompositeView.extend({
	
	template: JST["events/new"],

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
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
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