class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /restaurants
  # GET /restaurants.json
  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  # GET /restaurants/1
  # GET /restaurants/1.json
  def show
    render json: @restaurant
  end

  # POST /restaurants
  # POST /restaurants.json
  def create
    @restaurant = Restaurant.new(restaurant_params)
    if @restaurant.save
      render json: @restaurant, status: :created
    else
      render json: @restaurant.errors, status: :bad_request
    end
  end

  # PATCH/PUT /restaurants/1
  # PATCH/PUT /restaurants/1.json
  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant, status: :ok
    else
      render json: @restaurant.errors, status: :bad_request
    end
  end

  # DELETE /restaurants/1
  # DELETE /restaurants/1.json
  def destroy
    if @restaurant.destroy
      head :ok
    else
      render json: @restaurant.errors, status: :bad_request
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Restaurant does not exist" }, status: :not_found
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def restaurant_params
      params.permit(:title, :cuisine_id, :rating, :has_10bis, :address, :max_delivery_time)
    end
end