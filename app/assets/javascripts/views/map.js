RingerPinger.Views.Map = Backbone.CompositeView.extend({
	
	template: JST["map"],

	initialize: function() {
	},

	events: {
	},

	initializeMap: function() {
		var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: new google.maps.LatLng(37.7810556,-122.411455),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions)
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		google.maps.event.addDomListener(window, 'load', this.initializeMap);
		return this;
	},
})