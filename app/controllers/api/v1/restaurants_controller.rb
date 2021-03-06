class Api::V1::RestaurantsController < ApplicationController
  include ErrorConcern

  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /restaurants
  def index
    render json: Restaurant.all
  end

  # GET /restaurants/1
  def show
    render json: @restaurant
  end

  # POST /restaurants
  def create
    @restaurant = Restaurant.create!(restaurant_params)
    render json: @restaurant, status: :created
  end

  # PATCH/PUT /restaurants/1
  def update
    @restaurant.update!(restaurant_params)
    render json: @restaurant, status: :ok
  end

  # DELETE /restaurants/1
  def destroy
    @restaurant.destroy
    head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant
      @restaurant = Restaurant.find(params.require(:id))
    end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def restaurant_params
      params.permit(:title, :cuisine_id, :rating, :has_10bis, :address, :max_delivery_time, :lat, :lng)
    end
end