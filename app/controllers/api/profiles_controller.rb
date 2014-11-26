module Api
	class ProfilesController < ApiController
		before_action :verify_logged_in

		def index
			@profiles = Profile.all
		end
	 
		def new
			
		end
	end
end
