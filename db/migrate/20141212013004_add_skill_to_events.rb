class AddSkillToEvents < ActiveRecord::Migration
  def change
  	add_column :events, :skill_level, :string, null: false
  end
end
