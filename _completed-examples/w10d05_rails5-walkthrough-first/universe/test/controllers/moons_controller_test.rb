require 'test_helper'

class MoonsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @moon = moons(:one)
  end

  test "should get index" do
    get moons_url
    assert_response :success
  end

  test "should get new" do
    get new_moon_url
    assert_response :success
  end

  test "should create moon" do
    assert_difference('Moon.count') do
      post moons_url, params: { moon: { name: @moon.name, planet_id: @moon.planet_id } }
    end

    assert_redirected_to moon_url(Moon.last)
  end

  test "should show moon" do
    get moon_url(@moon)
    assert_response :success
  end

  test "should get edit" do
    get edit_moon_url(@moon)
    assert_response :success
  end

  test "should update moon" do
    patch moon_url(@moon), params: { moon: { name: @moon.name, planet_id: @moon.planet_id } }
    assert_redirected_to moon_url(@moon)
  end

  test "should destroy moon" do
    assert_difference('Moon.count', -1) do
      delete moon_url(@moon)
    end

    assert_redirected_to moons_url
  end
end
