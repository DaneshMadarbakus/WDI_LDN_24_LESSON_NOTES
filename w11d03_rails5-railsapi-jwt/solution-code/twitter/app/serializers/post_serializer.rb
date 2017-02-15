class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :length, :url
  has_one :user

  def length
    object.body.length
  end

  def url
    Rails.application.routes.url_helpers.post_url object, only_path: true
  end
end
