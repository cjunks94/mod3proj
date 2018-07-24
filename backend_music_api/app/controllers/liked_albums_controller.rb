class LikedAlbumsController < ApplicationController
# before_action :liked_albums
  def index
    @liked_albums = LikedAlbum.all
    # render html: index template
    render json: @liked_albums
  end
  
  def show
    @liked_albums = LikedAlbum.all
    liked = @liked_albums.find_by(id: params['id'])
    render json: liked
  end

  def create#adding to backend
    user = User.all.find_by(id: params[:user_id])
    check = user.albums.find_by(collectionId: params[:albumId])

    if params[:albumId].nil?
      helperDude(params)
    elsif check.nil?

      if Album.where(collectionId: params[:albumId]) == []

        helperDude(params).collectionId = params[:albumId]

      else
        album = Album.all.find_by(collectionId: params[:albumId])
        liked_album = LikedAlbum.new({user_id: params[:user_id], album_id: album.id})
        liked_album.save
      end
    end
    render json: liked_album
  end

  def destroy
    User.all.find_by(id: params['user_id']).liked_albums.find_by(album_id: params['id']).destroy
  end
end

  private
def helperDude(params)

  album = Album.create(collectionName: params[:collectionName],
  artistName: params[:artistName],
  collectionPrice: params[:collectionPrice],
  artworkUrl100: params[:artworkUrl100]) #
  # return.id = params id
  #
  liked_album = LikedAlbum.new({user_id: params[:user_id], album_id: album.id})
  liked_album.save
  return album
end
