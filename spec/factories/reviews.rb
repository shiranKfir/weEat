FactoryBot.define do
  factory :review do
    reviewer_name { Faker::Name.name }
    rating          Random.rand(1..3)
    comment       { Faker::Lorem.sentence }
    association :restaurant, factory: :restaurant, strategy: :build
  end
end