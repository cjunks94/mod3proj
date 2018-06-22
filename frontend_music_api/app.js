const api = new Adapter()
const albumBox = document.querySelector(".album_box")
const newFormHolder = document.getElementById('new_form_holder')

function createAlbumDiv(album, func){
  return`
  <form class="render_album_container" data-album-id=${func}>
    <h3 id='album_name'>${album.collectionName}</h3>
    <img src="${album.artworkUrl100}" alt="album artwork" onerror="if (this.src != 'error.jpg') this.src = 'error.jpg';" style="width:175px;height:175px;">
    <h1 id='album_artist'>${album.artistName}</h1>
    <p id='album_price'>${album.collectionPrice}</p>
    <button id='like_album' data-album-id=${func} type="submit">i dig it</button>
    <br>
  </form>`
}

function createNewForm(){
return`<form id="new_form" action="index.html" method="post">
        <input id='album_new_name_input' placeholder="Album Name" type="text">
        <input id='album_new_artist_name_input' placeholder="Artist Name" type="text">
        <input id='album_new_art_url' placeholder="Album artwork(url)" type="text">
        <input id='album_new_price' placeholder="Album price" type="float">
        <button id='new_form_submit' type="submit" name="button">New dude</button>
      </form><br>
`
}

function renderNewForm(){
  newFormHolder.innerHTML=createNewForm()
}

function removeNewForm(){
  newFormHolder.innerHTML=''
}
function sendAlbumData(event){
  const sendAlbumImage = event.target.querySelector('img').src
  const sendAlbumName = event.target.querySelector('#album_name').innerText
  const sendAlbumId = event.target.dataset.albumId
  const sendAlbumPrice = event.target.querySelector('#album_price').innerText
  const sendArtistName = event.target.querySelector('#album_artist').innerText
  return {collectionName: sendAlbumName,
    artistName: sendArtistName,
    artworkUrl100: sendAlbumImage,
    collectionPrice: sendAlbumPrice, albumId: sendAlbumId}
}
function makeAlbumData(event){
  const newFormAlbumName = document.getElementById('new_form').album_new_name_input.value
  const newFormArtistName = document.getElementById('new_form').album_new_artist_name_input.value
  const newFormArtUrl = document.getElementById('new_form').album_new_art_url.value
  const newFormAlbumPrice = document.getElementById('new_form').album_new_price.value

  return {collectionName: newFormAlbumName,
    artistName: newFormArtistName,
    artworkUrl100: newFormArtUrl,
    collectionPrice: newFormAlbumPrice}

}

function appendAlbums(e){
  albumBox.innerHTML=''
  api.searchAlbums(e).then(albums =>{
    albums.results.forEach(album =>{
      albumBox.innerHTML+=createAlbumDiv(album, album.collectionId)
    })
  })
}
//make dynamic delete other
//make albums into results??
//link as arg?
function renderLikedAlbums(e){
  albumBox.innerHTML=''
  api.getUserLikes(e).then(user =>{
    user.albums.forEach(album =>{
      albumBox.innerHTML+=createAlbumDiv(album, album.Id)
    })
  })
}
