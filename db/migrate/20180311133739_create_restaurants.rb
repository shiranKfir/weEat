class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.belongs_to :cuisine, foreign_key: true
      t.string :title
      t.integer :rating
      t.boolean :has_10bis
      t.string :address
      t.integer :max_delivery_time

      t.timestamps
    end
  end
end
