require 'test_helper'

class CuisinesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cuisine = cuisines(:one)
  end

  test "should get index" do
    get cuisines_url
    assert_response :success
  end

  test "should get new" do
    get new_cuisine_url
    assert_response :success
  end

  test "should create cuisine" do
    assert_difference('Cuisine.count') do
      post cuisines_url, params: { cuisine: { icon: @cuisine.icon, name: @cuisine.name } }
    end

    assert_redirected_to cuisine_url(Cuisine.last)
  end

  test "should show cuisine" do
    get cuisine_url(@cuisine)
    assert_response :success
  end

  test "should get edit" do
    get edit_cuisine_url(@cuisine)
    assert_response :success
  end

  test "should update cuisine" do
    patch cuisine_url(@cuisine), params: { cuisine: { icon: @cuisine.icon, name: @cuisine.name } }
    assert_redirected_to cuisine_url(@cuisine)
  end

  test "should destroy cuisine" do
    assert_difference('Cuisine.count', -1) do
      delete cuisine_url(@cuisine)
    end

    assert_redirected_to cuisines_url
  end
end
