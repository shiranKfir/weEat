require 'rails_helper'

describe Review, type: :model do
  let(:restaurant) { create(:restaurant) }
  context 'associations' do
    it { is_expected.to belong_to(:restaurant) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:restaurant_id) }
    it { is_expected.to validate_presence_of(:reviewer_name) }
    it { is_expected.to validate_presence_of(:rating) }
  end

  context 'after create' do
    it 'should update the restaurant ranking to 2' do
      [1, 3].each { |rating| create(:review, rating: rating, restaurant: restaurant) }
      expect(restaurant.rating).to eq(2)
    end
  end

  context 'after destroy' do
    it 'should update the restaurant ranking to 1' do
      #Review.last.destroy
      #puts '#############################'
      #puts restaurant.reviews.length
    end
  end
end


#Review.last.destroy
#expect(restaurant.reload.rating).to eq(1)