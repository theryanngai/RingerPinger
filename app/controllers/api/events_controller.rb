class Api::EventsController < ApplicationController
	before_action :verify_logged_in

	def index
		@events = Event.all
	end

	def show
		@event = Event.find(params[:id])
	end

	def create
		@event = Event.new(event_params)

		if @event.save
			render :show, status: :created
		else
			render json: @event.errors.full_messages, status: :unprocessable_entity
		end
	end

	private
	def event_params
		params.permit(:title, :description, :sport, :max_players, :user_id, :location, :event_date)
	end
end
