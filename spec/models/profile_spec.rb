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

require 'rails_helper'

RSpec.describe Profile, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
