class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
  	@current_user = User.find_by_session_token(session[:token])
  end

  def logged_in?
  	!!current_user
  end

  def log_in_user!(user)
    @current_user = user
  	session[:token] = user.reset_session_token!
  end

  def log_out
  	current_user.reset_session_token!
  	session[:token] = nil
  	redirect_to new_session_url
  end

  def verify_logged_in
    unless logged_in?
  	 render json: "Oops! Looks like you aren't logged in!", status: :unathorized
    end
  end
end
