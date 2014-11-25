class ProfilesController < ApplicationController
	before_action :verify_logged_in

	def index
		@profiles = Profile.all
	end
	
end
