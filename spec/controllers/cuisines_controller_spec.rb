require 'rails_helper'

describe Api::V1::CuisinesController, type: :controller do
  describe '#index' do
    it 'returns all the cuisines' do
      create_list(:cuisine, 5)
      get :index, format: :json
      expect(response).to be_success
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.count).to eq(5)
    end
  end

  describe '#create' do
    context 'adding new cuisine with correct params' do
      it 'returns a successful json' do
        cuisine_params = attributes_for(:cuisine)
        post :create, params: cuisine_params
        expect(response).to be_success
        expect(response).to have_http_status(:created)
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
    let(:cuisine){ create(:cuisine, name: 'Burger') }
    it 'updates cuisine and returns it' do
      put :update, params: { id: cuisine.id, name: 'Pizza' }
      parsed_response = JSON.parse(response.body)
      expect(response).to have_http_status(:ok)
      expect(parsed_response['name']).to eq('Pizza')
    end
    it 'returns an error when the restaurant does not exist' do
      params = { id: cuisine.id + 10, name: 'Pizza' }
      put :update, params: params
      expect(response).to be_not_found
    end
  end

  describe '#destroy' do
    it 'deletes the restaurant' do
      cuisine = create(:cuisine)
      expect(response).to have_http_status(:ok)
      id = cuisine.id
      totalCuisines = Cuisine.count
      delete :destroy, params: { id: id }
      expect(response).to have_http_status(:ok)
      expect(Cuisine.count).to eq(totalCuisines - 1)
    end
  end
end