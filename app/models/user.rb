# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  first_name      :string(255)      not null
#  last_name       :string(255)      not null
#  session_token   :string(255)      not null
#  status          :string(255)      default("unavailable")
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
	attr_reader :password

	validates :email, presence: true, uniqueness: true
	validates :session_token, presence: true, uniqueness: true
	validates :first_name, :last_name, presence: true
	validates :password_digest, presence: true
	validates :password, length: { minimum: 6, allow_nil: true }

	after_initialize :ensure_session_token

	has_one :profile

	def self.find_by_credentials(email, password)
		user = User.find_by_email(email)
		return nil unless user
		return nil unless user.is_password?(password)
		return user
	end

	def self.generate_session_token
		SecureRandom::urlsafe_base64
	end

	def reset_session_token!
		self.session_token = self.class.generate_session_token
		self.save
		self.session_token
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	private
	def ensure_session_token
		self.session_token ||= User.generate_session_token
	end
end
