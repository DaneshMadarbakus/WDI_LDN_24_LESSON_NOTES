class Customer < ActiveRecord::Base
  validates :name, length: { minimum: 2 } 
  validates :name, length: { maximum: 500 }
  validates :name, length: { in: 8..255 }
  validates :name, uniqueness: true

  validates :password, length: { minimum: 2 }, if: Proc.new { |u| u.password.present? }

  ## this is and alternate proc syntax
  # validates :password, length: { minimum: 2 }, if: -> (u) { u.password.present? } 

  # it will be possible to update email with a duplicated value
  validates :email, uniqueness: true, on: :create
   
  # it will be possible to create the record with a non-numerical age
  validates :age, numericality: true, on: :update
   
  # the default (validates on both create and update)
  validates :name, presence: true, on: :save

  validate :active_customer, on: :create
     
  def active_customer
    errors.add(:customer_id, "is not active") unless self.active?
  end
end
