RingerPinger.Views.Map = Backbone.CompositeView.extend({
	
	template: JST["map"],

	className: 'map-box',

	initialize: function() {
		this.mapOptions = {
      center: new google.maps.LatLng(37.7810556,-122.411455),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
	},

	initializeMap: function() {
    this.map = new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions)
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);

		setTimeout(function() {
			this.initializeMap();
			google.maps.event.trigger(this.map, "resize");
		}.bind(this), 0)
		return this;
	},
})