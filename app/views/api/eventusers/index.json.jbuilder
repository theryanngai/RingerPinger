json.array! @eventusers do |eventuser|
	json.(eventuser, :id, :user_id, :event_id)
end