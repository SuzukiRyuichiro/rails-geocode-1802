class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.references :flat, null: false, foreign_key: true
      t.string :room_numer

      t.timestamps
    end
  end
end
