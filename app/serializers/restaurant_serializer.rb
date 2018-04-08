class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :has_10bis, :address, :cuisine_id, :max_delivery_time, :lat, :lng
  belongs_to :cuisine, serializer: CuisineSerializer
  has_many :reviews, serializer: ReviewSerializer
end