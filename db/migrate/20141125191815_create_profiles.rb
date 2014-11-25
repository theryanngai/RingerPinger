class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
    	t.string :about_me
    	t.string :profile_picture
    	t.integer :user_id, null: false


      t.timestamps
    end

    add_index :profiles, :user_id, unique: true
  end
end
