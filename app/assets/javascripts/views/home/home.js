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

		// tour.addStep('loginStep', {
		// 	title: 'Login As A Guest',
		// 	text: 'Click here to login as a guest',
		// 	attachTo: '.guest-login-link',
		// 	classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
		// 	buttons: [
		// 		{
		// 			text: 'Next',
		// 			action: tour.next,
		// 			classes: 'shepherd-button-example-primary'
		// 		},

		// 		{
		// 			text: 'End Tutorial',
		// 			classes: 'shepherd-button-secondary',
		// 			action: tour.complete
		// 		}
		// 	]
		// });


		tour.addStep('searchStep', {
			title: 'Find Local Events',
			text: "Tip: Search San Francisco for existing events. Click the Guest Login link in the top right corner if you haven't created an account yet!",
			attachTo: '.search-location',
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

		tour.addStep('createStep', {
			title: 'Create Your Own Event',
			text: 'Click here to create your own event that other users will be able to see and join.',
			attachTo: '#create-event left',
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

		tour.addStep('allEvents', {
			title: 'See All Events',
			text: 'Explore all the events that local athletes have created!',
			attachTo: '#all-events',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [				
				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: tour.complete
				}
			]
		});
	},

	startTour: function() {
		if (tour) {
			tour.complete();
		}
		
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