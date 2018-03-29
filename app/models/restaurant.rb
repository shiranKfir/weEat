class Restaurant < ApplicationRecord
  has_many :reviews, dependent: :destroy
  belongs_to :cuisine

  validates :title, :cuisine_id, :address, :max_delivery_time, :has_10bis, presence: true
  validates :title, uniqueness: { scope: :address }

  before_save :default_values
  def default_values
    self.rating ||= 0
  end

  def update_rating
    self.rating = reviews.exists? ? reviews.average(:rating).round : 0
    save!
  end
end
