class Api::SportsController < ApplicationController
	def index
		@sports = Sport.all
	end

	def create
		@sport = Sport.new(sport_params)

		if @sport.save
			render :show, status: :created
		else 
			render json: @sport.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@sport = Sport.find(params[:id])
	end

	private
	def sport_params
		params.require(:sport).permit(:name)
	end
end

