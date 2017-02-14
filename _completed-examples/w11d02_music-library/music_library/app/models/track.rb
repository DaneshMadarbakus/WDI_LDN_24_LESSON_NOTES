class Track < ApplicationRecord
  belongs_to :album
  has_and_belongs_to_many :artists

  validates :album_id, presence: true
  validates :title, uniqueness: true
end
