class Api::UsersController < ApplicationController
	wrap_parameters :user, include: [
		:first_name, 
		:last_name, 
		:password,
		:email
	]

	def create
		@user = User.new(user_params)

		if @user.save
			log_in_user!(@user)
			render :show, status: :created
		else
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end

	def index
		@users = User.all
	end

	def show
		@user = User.find(params[:id])
	end

	def edit
		@user = User.find(params[:id])

		if @user.update(user_params)
			render :show, status: :204
		else
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end
  

	private
	def user_params
		params.require(:user).permit(:email, :password, :first_name, :last_name,
																 :about_me, :profile_pic, :location, :status)
	end
end
