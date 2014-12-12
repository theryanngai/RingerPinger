class Event < ActiveRecord::Base
	validates :title, presence: true, uniqueness: true
	validates :description, :sport, :max_players, :user_id, :skill_level, presence: true

	has_many :eventusers
	has_many :users, through: :eventusers

	geocoded_by :location
	after_validation :geocode

	belongs_to(
		:creator,
		class_name: 'User',
		foreign_key: :user_id,
		primary_key: :id
	)

end
