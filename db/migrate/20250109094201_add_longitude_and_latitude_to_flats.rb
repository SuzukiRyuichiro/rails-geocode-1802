class AddLongitudeAndLatitudeToFlats < ActiveRecord::Migration[7.1]
  def change
    add_column :flats, :longitude, :float
    add_column :flats, :latitude, :float
  end
end
