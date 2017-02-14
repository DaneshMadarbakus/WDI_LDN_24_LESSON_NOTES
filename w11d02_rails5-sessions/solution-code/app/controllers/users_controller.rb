class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  # Using "User.create(params[:person])" would raise an
  # ActiveModel::ForbiddenAttributes exception because it'd
  # be using mass assignment without an explicit permit step.
  # This is the recommended form:
  def create
    @user = User.new user_params
    if @user.save
      flash[:success] = "Thank you for registering!"
      redirect_to users_path
    else
      render 'new'
    end
  end

  private
  # Using a private method to encapsulate the permissible parameters is
  # just a good pattern since you'll be able to reuse the same permit
  # list between create and update. Also, you can specialize this method
  # with per-user checking of permissible attributes.
    def user_params
      params.require(:user).permit( :email, :password, :password_confirmation)
    end
end
