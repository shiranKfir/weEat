class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :has_10bis, :address, :max_delivery_time
  belongs_to :cuisine, serializer: CuisineSerializer
end