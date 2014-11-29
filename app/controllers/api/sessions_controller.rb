class Api::SessionsController < ApplicationController
	def create
		@user = User.find_by_credentials(
																			user_params[:email], 
																			user_params[:password]
																		)

		if @user
			log_in_user!(@user)
			render :show
		else
			render json: { message: "Bad Username/Password combination." }, status: :unprocessable_entity
		end
	end

	def destroy 
		log_out
		render json: {}
	end

	private
	def user_params
		params.require(:user).permit(:email, :password)
	end
end
