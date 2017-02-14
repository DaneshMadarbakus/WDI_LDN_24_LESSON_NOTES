class Album < ApplicationRecord
  belongs_to :owner, class_name: "Artist", foreign_key: :owner_id
  has_many :tracks
  has_many :artists, through: :tracks

  validates :owner_id, presence: :true
  validates :title, presence: :true
end
