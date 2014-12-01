json.array! @users do |user|
	json.(user, :email, :password_digest, :first_name, :last_name)
end