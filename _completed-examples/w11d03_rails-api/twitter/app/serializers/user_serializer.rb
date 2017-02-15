class UserSerializer < ActiveModel::Serializer
  has_many :posts
  attributes :id, :username, :first_name, :last_name, :full_name, :number_of_posts

  def full_name
    "#{object.first_name} #{object.last_name}"
  end
end
