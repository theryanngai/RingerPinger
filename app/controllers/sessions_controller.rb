class SessionsController < ApplicationController
	def new
		@user = User.new
	end

	def create
		@user = User.find_by_credentials(user_params[:email], user_params[:password])

		if @user
			flash.now[:alerts] = 'Thanks for logging in!'
			log_in_user!(@user)
		else
			flash.now[:alerts] = 'Bad Username/Password combination.'
			@user = User.new
			render :new
		end
	end

	def destroy 
		log_out
	end

	private
	def user_params
		params.require(:user).permit(:email, :password)
	end
end
