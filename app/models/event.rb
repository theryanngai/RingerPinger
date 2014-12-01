class Event < ActiveRecord::Base
	validates :title, presence: true, uniqueness: true
	validates :description, :sport, :max_players, presence: true
end
