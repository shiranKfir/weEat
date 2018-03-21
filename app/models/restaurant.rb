class Restaurant < ApplicationRecord
  has_many :reviews, dependent: :destroy
  belongs_to :cuisine

  before_save :default_values
  def default_values
    self.rating ||= 0
  end

  validates :title, :cuisine_id, :address, :max_delivery_time, :has_10bis, presence: true
  validates :title, uniqueness: { scope: :address }

  def update_rating
    rating_val = reviews.exists? ? reviews.average(:rating).round : 0
    self.rating = rating_val
  end
end
