class User < ApplicationRecord
  has_secure_password
  has_many :posts
  validates :username, presence: true, uniqueness: true

  # def full_name
  #   "#{first_name} #{last_name}"
  # end

  def number_of_posts
    posts.count
  end

end
