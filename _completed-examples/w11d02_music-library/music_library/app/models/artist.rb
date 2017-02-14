class Artist < ApplicationRecord
  has_many :albums_as_owner, class_name: "Album", foreign_key: :owner_id
  has_and_belongs_to_many :tracks
  has_many :albums, through: :tracks

  validates :name, presence: true
  validates :name, uniqueness: true
end
