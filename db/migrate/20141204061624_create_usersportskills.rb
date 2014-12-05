class CreateUsersportskills < ActiveRecord::Migration
  def change
    create_table :usersportskills do |t|
    	t.integer :usersport_id, null: false;
    	t.string :usersport_skill, null: false;

      t.timestamps
    end

    add_index :usersportskills, :usersport_id, unique: true
  end
end
