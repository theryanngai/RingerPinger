RingerPinger.Views.UsersIndex = Backbone.CompositeView.extend({
	
	template: JST["user/index"],

	initialize: function() {
		this.addNavbar();
		this.addFooter();
		this.addMap();

		this.listenTo(RingerPinger.users, "sync", this.render);
	},

	render: function() {
		var content = this.template({ users: RingerPinger.users });
		this.$el.html(content);

		this.$("#map-find").click(function(){
      $("#map-input").trigger("geocode");
      return false;
    });
    
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

	addMap: function() {
		this.mapView = new RingerPinger.Views.Map();
		this.addSubview('#map-container', this.mapView);
	},
})