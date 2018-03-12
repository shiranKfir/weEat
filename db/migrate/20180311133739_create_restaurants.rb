class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :title
      t.string :genre
      t.integer :rating
      t.boolean :has_10bis
      t.string :address
      t.integer :delivery_time

      t.timestamps
    end
  end
end
