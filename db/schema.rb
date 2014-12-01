# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141201225753) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: true do |t|
    t.string   "title",       null: false
    t.string   "description", null: false
    t.string   "sport",       null: false
    t.string   "max_players", null: false
    t.string   "location"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",     null: false
  end

  create_table "profiles", force: true do |t|
    t.string   "about_me"
    t.string   "profile_picture"
    t.integer  "user_id",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                                   null: false
    t.string   "password_digest",                         null: false
    t.string   "first_name",                              null: false
    t.string   "last_name",                               null: false
    t.string   "session_token",                           null: false
    t.string   "status",          default: "unavailable"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
