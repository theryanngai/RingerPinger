class Api::UsersportsController < ApplicationController
	def index
		@usersports = Usersport.all
	end

	def create
		@usersport = Usersport.new

		if @usersport.save
			render :show, status: :created
		else 
			render json: @usersport.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@usersport = Usersport.find(params[:id])
	end
end
