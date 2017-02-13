class Order < ActiveRecord::Base
  belongs_to :customer
  validates :value, numericality: true 
  validates :value, numericality: { only_integer: true }
  validates :card_number, presence: true, if: :paid_with_card?

  def paid_with_card?
    payment_type == "card"
  end
end
