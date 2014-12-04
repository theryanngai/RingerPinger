json.array! @sports do |sport|
	json.(sport, :id, :name, :users)
end