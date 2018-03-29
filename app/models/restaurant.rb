class Restaurant < ApplicationRecord
  has_many :reviews, dependent: :destroy
  belongs_to :cuisine

  before_save :default_values
  def default_values
    self.rating ||= 0
  end

  validates :title, :cuisine_id, :address, :max_delivery_time, presence: true
  validates :title, uniqueness: { scope: :address }

  def update_rating
    #self.rating = reviews.exists? ? reviews.average(:rating).round : 0
    update_attribute(:rating, reviews.exists? ? reviews.average(:rating).round : 0)
  end
end
