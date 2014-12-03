class AddLocationToUser < ActiveRecord::Migration
  def self.up
  	add_column :users, :location, :string
  end
end
