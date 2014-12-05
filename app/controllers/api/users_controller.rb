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

	def update
		@user = current_user

		if @user.update(user_params)
			render :show
		else
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end
  

	private
	def user_params
		params.permit(:id, :email, :password, :first_name, 
			:last_name, :about_me, :profile_picture, :location, :status)
	end
end
