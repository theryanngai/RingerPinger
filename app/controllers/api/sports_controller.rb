class Api::SportsController < ApplicationController
	def index
		@sports = Sport.all
	end

	def create
		@sport = Sport.new

		if @sport.save
			render :index, status: :created
		else 
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@sport = Sport.find(params[:id])
	end
end

