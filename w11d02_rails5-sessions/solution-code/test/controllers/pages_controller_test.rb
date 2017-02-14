require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get everyone" do
    get pages_everyone_url
    assert_response :success
  end

  test "should get logged_in" do
    get pages_logged_in_url
    assert_response :success
  end

  test "should get logged_out" do
    get pages_logged_out_url
    assert_response :success
  end

end
