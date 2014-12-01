class Api::EventsController < ApplicationController
	before_action :verify_logged_in

	def index
		@events = Event.all
	end

	def show
	end


	
end
