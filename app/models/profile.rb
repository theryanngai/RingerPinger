# == Schema Information
#
# Table name: profiles
#
#  id              :integer          not null, primary key
#  about_me        :string(255)
#  profile_picture :string(255)
#  user_id         :integer          not null
#  created_at      :datetime
#  updated_at      :datetime
#

class Profile < ActiveRecord::Base
	validates :user_id, presence: true, uniqueness: true

	belongs_to :user
end
