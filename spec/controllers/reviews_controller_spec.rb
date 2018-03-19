require 'rails_helper'

describe ReviewsController, type: :controller do
  let!(:restaurant) {create(:restaurant_with_5_reviews)}
  let!(:new_review) {create(:review, rating: 1, restaurant: restaurant)}
  let(:review_params){ attributes_for(:review, restaurant_id: restaurant.id) }
  let(:review_params_with_bad_rating){ attributes_for(:review, restaurant_id: restaurant.id, rating: 10) }

  describe '#index' do
    it 'returns a successful response' do
      get :index, format: :json
      expect(response).to be_success
    end

    it 'returns all the reviews' do
      get :index, format: :json
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.count).to eq(restaurant.reviews.length)
    end
  end

  describe '#show' do
    it 'returns data of a single review' do
      get :show, params: { id: new_review.id }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['id']).to eq new_review.id
      expect(response).to be_success
    end

    it 'returns an error when the review does not exist' do
      get :show, params: { id: new_review.id + 10 }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']).to eq("Review does not exist")
      expect(response).to be_not_found
    end
  end

  describe '#create' do
    context 'adding new review with correct params' do
      it 'returns a successful json' do
        post :create, params: review_params
        expect(response).to be_success
        expect(response).to have_http_status(:created)
      end
    end

    context 'incorrect rating' do
      it 'returns bad request error' do
        post :create, params: review_params_with_bad_rating
        expect(response).to be_bad_request
      end
    end

    context 'not sending params in request' do
      it 'returns bad request error' do
        post :create
        expect(response).to be_bad_request
      end
    end
  end

  describe '#update' do
    it 'updates review and returns it' do
      put :update, params: { id: new_review.id, rating: 3 }
      parsed_response = JSON.parse(response.body)
      expect(response).to have_http_status(:ok)
      expect(parsed_response['rating']).to eq 3
    end
    it 'returns an error when the review does not exist' do
      put :update, params: { id: new_review.id + 10, rating: 3 }
      expect(response).to be_not_found
    end
  end

  describe '#destroy' do
    it 'deletes the review' do
      id = new_review.id
      delete :destroy, params: { id: id }
      get :show, params: { id: id }
      expect(response).to be_not_found
    end
  end
end