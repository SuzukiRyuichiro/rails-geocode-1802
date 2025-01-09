class CreateFlats < ActiveRecord::Migration[7.1]
  def change
    create_table :flats do |t|
      t.string :address
      t.string :name

      t.timestamps
    end
  end
end
