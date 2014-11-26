json.array! @profiles do |profile|
	json.(profile, :about_me, :profile_picture, :user)
end