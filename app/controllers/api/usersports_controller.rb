class Api::UsersportsController < ApplicationController
	def index
		@usersports = Usersport.all
	end

	def create
		@usersport = Usersport.new(usersport_params)

		if @usersport.save
			render :show, status: :created
		else 
			render json: @usersport.errors.full_messages, status: :unprocessable_entity
		end
	end

	def destroy
		@usersport = Usersport.find(params[:id])

		if @usersport.destroy
			render :index, status: 200
		else
			render json: @usersport.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@usersport = Usersport.find(params[:id])
	end

	private 
	def usersport_params
		params.require(:usersport).permit(:sport_id, :user_id, :skill)
	end
end
