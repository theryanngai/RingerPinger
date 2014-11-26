module Api
	class ProfilesController < ApiController
		before_action :verify_logged_in

		def index
			@profiles = Profile.all
		end
	 
		def new
			
		end

		def show
			@profile = Profile.find(params[:id])
		end

		private
		def profile_params
			params.require(:profile).permit(:id, :about_me, :profile_picture, :user_id, 
																			 :created_at, :updated_at)
		end
	end
end
