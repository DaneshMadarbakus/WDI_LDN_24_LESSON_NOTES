require 'test_helper'

class SecretControllerTest < ActionDispatch::IntegrationTest
  test "should get visible" do
    get secret_visible_url
    assert_response :success
  end

  test "should get secret" do
    get secret_secret_url
    assert_response :success
  end

end
