require 'rails_helper'

describe Restaurant, type: :model do
  context 'associations' do
    it { is_expected.to have_many(:reviews) }
    it { is_expected.to belong_to(:cuisine) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:cuisine_id) }
    it { is_expected.to validate_presence_of(:address) }
    it { is_expected.to validate_presence_of(:max_delivery_time) }
    it { is_expected.to validate_presence_of(:has_10bis) }

    it { is_expected.to validate_uniqueness_of(:title).scoped_to(:address) }
  end

  context 'test restaurant rating' do
    let(:restaurant) { create(:restaurant) }
    it 'should be 0 when creating new restaurant' do
      expect(restaurant.rating).to eq(0)
    end
    it 'should be the average of all the ratings in the restaurant reviews' do
      restaurant = create(:restaurant_with_5_reviews)
      average_rating = restaurant.reviews.average(:rating).round
      expect(restaurant.rating).to eq(average_rating)
    end
  end
end