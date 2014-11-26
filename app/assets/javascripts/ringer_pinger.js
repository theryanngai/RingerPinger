window.RingerPinger = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var $body = $('body');
  	new RingerPinger.Routers.Router ({ $rootEl: $body });
  	Backbone.history.start();
  }
};


