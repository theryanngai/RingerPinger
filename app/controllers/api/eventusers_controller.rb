class Api::EventusersController < ApplicationController
	def index
		@eventusers = Eventuser.all
	end

	def create
		@eventuser = Eventuser.new

		if @eventuser.save
			render json: @eventuser, status: :created
		else 
			render json: @eventuser.errors.full_messages, status: :unprocessable_entity
		end
	end

	def destroy
	end
end

