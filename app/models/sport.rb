class Sport < ActiveRecord::Base
	validates :name, presence: true, uniqueness: true

	has_many :usersports
	has_many :users, through: :usersports
end
