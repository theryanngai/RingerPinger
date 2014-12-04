class DropUsersSports < ActiveRecord::Migration
  def change
  	drop_table :usersports 
  	drop_table :usersportskills
  end
end
