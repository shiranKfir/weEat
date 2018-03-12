json.extract! restaurant, :id, :title, :genre, :rating, :has_10bis, :address, :delivery_time, :created_at, :updated_at
json.url restaurant_url(restaurant, format: :json)
