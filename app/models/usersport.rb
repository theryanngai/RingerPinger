class Usersport < ActiveRecord::Base
	validates :user_id, :sport_id, :skill, presence: true

	belongs_to :user
	belongs_to :sport
end
