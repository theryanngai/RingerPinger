module Api
	class UsersController < ApiController
		def new 
			@user = User.new
		end

		def create
			debugger;
			@user = User.new(user_params)

			if @user.save
				flash.now[:alerts] = 'Thanks for creating an account!'
				log_in_user!(@user)
			else
				flash.now[:alerts] = @user.errors.full_messages
				render :new
			end
		end


		private
		def user_params
			params.require(:user).permit(:email, :password, :first_name, :last_name)
		end
	end
end
