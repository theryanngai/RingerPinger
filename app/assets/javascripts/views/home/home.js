RingerPinger.Views.Home = Backbone.CompositeView.extend({
	
	template: JST["home/home"],

	className: 'index-content',

	events: {
		'click .info-button': 'startTour'
	},

	initialize: function() {
		this.addNavbar();
		this.addSearchbar();
		this.addFooter();
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addTour: function() {
		tour = new Shepherd.Tour({
			defaults: {
				classes: 'shepherd-theme-arrows',
				// scrollTo: true
			}
		});

		tour.addStep('welcomeStep', {
			title: 'Welcome to RingerPinger!',
			text: 'RingerPinger is a service that allows athletes to find, create, and join local pickup games.',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Next',
					action: tour.next,
					classes: 'shepherd-button-example-primary'
				},

				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: tour.complete
				}
			]
		});


		tour.addStep('myStep', {
			title: 'Find Local Events',
			text: 'Tip: Search San Francisco for existing events.',
			attachTo: '.search-location',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Exit',
					classes: 'shepherd-button-secondary',
					action: function() {
						return tour.hide();
					}
				}
			]
		});
	},

	startTour: function() {
		tour.start();
	},

	addNavbar: function() {
		var navBarView = new RingerPinger.Views.HomeNavBar({ $homeEl: this.$el });
		this.addSubview('.navbar', navBarView);
	},

	addSearchbar: function() {
		var searchBarView = new RingerPinger.Views.HomeSearchBar;
		this.addSubview('#search-bar', searchBarView);
	},

	addFooter: function() {
		var footerView = new RingerPinger.Views.Footer;
		this.addSubview('.main-footer', footerView);
	}
})