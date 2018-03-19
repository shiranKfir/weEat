class Review < ApplicationRecord
  belongs_to :restaurant

  validates :restaurant_id, :reviewer_name, :rating, presence: true
  validates :rating, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 3}

  after_create :update_restaurant_rating
  after_destroy :update_restaurant_rating

  def update_restaurant_rating
    restaurant.update_rating
  end
end
