class AddUserIdToEvents < ActiveRecord::Migration
  def self.up
  	add_column :events, :user_id, :integer
  end
end
