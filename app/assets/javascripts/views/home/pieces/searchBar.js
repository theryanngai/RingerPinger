RingerPinger.Views.HomeSearchBar = Backbone.CompositeView.extend({
	template: JST['home/pieces/search_bar'],	

	events: {
		'submit': 'findEvents'
	},

	findEvents: function(event) {
		event.preventDefault();
		var formResults = $(event.target).serializeJSON().search;
		if (formResults.location === "") {
			alert("Please enter a location!");
			Backbone.history.navigate('#/', { trigger: true });
			return;
		}

		var queryString = "location=" + formResults.location 
		queryString += "&" + "start_date=" + formResults.start_date 
		queryString += "&" + "end_date=" + formResults.end_date
		queryString += "&" + "sport=" + formResults.sport
		Backbone.history.navigate('#/events?' + queryString, { trigger: true });
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.addAutocomplete();
		return this;
	},

	addAutocomplete: function() {
		RingerPinger.sports.fetch({
			success: function() {
				var availableSports = RingerPinger.sports.pluck('name');

				this.$("#event_sport").autocomplete({
   				source: availableSports
   			});

  			this.$('#event_sport').attr('autocomplete', 'on');
  		}.bind(this)
		});
	},
})