class PagesController < ApplicationController
  before_action :authenticate, only: :logged_in
  before_action :check_if_logged_out, only: :logged_out

  def everyone
    render text: "Yay, everyone!", layout: true
  end

  def logged_in
    render text: "Only logged in!", layout: true
  end

  def logged_out
    render text: "Only logged out!", layout: true
  end
end
