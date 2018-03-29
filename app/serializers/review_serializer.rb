class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :reviewer_name, :rating, :comment
  belongs_to :restaurant, serializer: RestaurantSerializer
end