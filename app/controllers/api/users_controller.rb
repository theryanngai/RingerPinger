module Api
	class UsersController < ApiController
		def new 
			@user = User.new
		end

		def create
			@user = User.new(user_params)

			if @user.save
				log_in_user!(@user)
				render :show, status: :created
			else
				render json: @user.errors.full_messages, status: :unprocessable_entity
			end
		end

		def show
			@current_user = current_user
		end


		private
		def user_params
			params.require(:user).permit(:email, :password, :first_name, :last_name)
		end
	end
end
