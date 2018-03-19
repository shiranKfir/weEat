require 'rails_helper'

describe RestaurantsController, type: :controller do
  let!(:cuisine){ create(:cuisine) }
  let(:new_restaurant) {create(:restaurant, title: "Burger king", address: "Dizengoff")}
  describe '#index' do
    it 'returns all the restaurants' do
      create_list(:restaurant, 5)
      get :index, format: :json
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.count).to eq(5)
      expect(response).to be_success
    end
  end

  describe '#show' do
    let(:restaurant) { create(:restaurant) }
    it 'returns data of a single restaurant' do
      get :show, params: { id: restaurant.id }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['id']).to eq restaurant.id
      expect(response).to be_success
    end

    it 'returns an error when the restaurant does not exist' do
      get :show, params: { id: restaurant.id + 10 }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']).to eq("Restaurant does not exist")
      expect(response).to be_not_found
    end
  end

  describe '#create' do
    let(:restaurant_params){ attributes_for(:restaurant, cuisine_id: cuisine.id) }
    context 'adding new restaurant with correct params' do
      it 'returns a successful json' do
        post :create, params: restaurant_params
        expect(response).to be_success
        expect(response).to have_http_status(:created)
      end
    end

    context 'trying to create restaurant that already exists on a specific address' do
      it 'returns bad request error' do
        post :create, params: {title: new_restaurant.title, address: new_restaurant.address, has_10bis: true,
                               max_delivery_time: 20, cuisine_id: cuisine.id}
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
    it 'updates restaurant and returns it' do
      put :update, params: { id: new_restaurant.id, address: 'bugrashov' }
      parsed_response = JSON.parse(response.body)
      expect(response).to have_http_status(:ok)
      expect(parsed_response['address']).to eq('bugrashov')
    end
    it 'returns an error when the restaurant does not exist' do
      put :update, params: { id: new_restaurant.id + 10, address: 'bugrashov' }
      expect(response).to be_not_found
    end
  end

  describe '#destroy' do
    let!(:restaurant) { create(:restaurant_with_5_reviews) }
    it 'deletes the restaurant' do
      id = restaurant.id
      delete :destroy, params: { id: id }
      get :show, params: { id: id }
      expect(response).to be_not_found
    end
    it 'deletes all the restaurant reviews' do
      expect {
        delete :destroy, params: { id: restaurant.id }
      }.to change{ Review.count }.by(-5)
    end
  end
end