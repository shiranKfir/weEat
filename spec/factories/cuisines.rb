FactoryBot.define do
  factory :cuisine do
    name { Faker::Name.name }
    icon { Faker::Name.name }
  end
end