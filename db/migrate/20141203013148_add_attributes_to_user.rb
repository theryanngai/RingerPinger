class AddAttributesToUser < ActiveRecord::Migration
  def self.up
  	add_column :users, :about_me, :string
  	add_column :users, :profile_picture, :string
  end
end
