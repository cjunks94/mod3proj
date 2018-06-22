document.addEventListener('DOMContentLoaded', function(){
  const searchBar = document.querySelector("#search_form")
  const api = new Adapter()

  document.addEventListener('click',(e)=>{
    if(e.target.id === 'new_button'){
      renderNewForm()
    }else if(e.target.id === 'render_user_likes'){
      renderLikedAlbums(e.target.dataset.userId)
    }else if(e.target.id === 'delete_album'){
      api.deleteFav(1,e.target.dataset.albumId)
      e.target.parentElement.remove()
      // .then(x =>{renderLikedAlbums(e.target.dataset.userId)})
    }
  })

  document.addEventListener('submit', (e) =>{
    e.preventDefault()//no load
      if(e.target.id === 'search_form'){
        appendAlbums(e.target.album_search_input.value)
    }else if(e.target.id === 'new_form'){
      //on submit new form send to backend and save
      api.createAlbum(makeAlbumData(e))
    }else if(e.target.className === 'render_album_container'){
      api.createAlbum(sendAlbumData(e))
    }
  })
})
