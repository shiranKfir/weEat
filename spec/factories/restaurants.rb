FactoryBot.define do
  factory :restaurant do
    title               { Faker::Name.name }
    has_10bis           { true }
    address             { Faker::Address.street_address }
    max_delivery_time   Random.rand(120)
    association :cuisine
  end
  factory :restaurant_with_5_reviews, parent: :restaurant do
    transient do
      reviews_count 5
    end
    after(:create) do |restaurant, evaluator|
      create_list(:review, evaluator.reviews_count, restaurant: restaurant)
    end
  end
end

