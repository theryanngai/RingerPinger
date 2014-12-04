class Usersport < ActiveRecord::Base
	validates :user_id, :sport_id, :skill, presence: true
end
