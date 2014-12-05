class Api::EventusersController < ApplicationController
	def index
		@eventusers = Eventuser.all
	end

	def create
		@eventuser = Eventuser.new(eventuser_params)

		if @eventuser.save
			render :show, status: :created
		else 
			render json: @eventuser.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@eventuser = Eventuser.find(params[:id])
	end

	private 
	def eventuser_params
		params.permit(:user_id, :event_id)
	end
end

