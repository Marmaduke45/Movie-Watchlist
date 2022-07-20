const key = '4c48d0a6';
const movieList = document.querySelector('.movie-list')
const watchlistEl = document.querySelector('.watchlist-list')
let html = ""





renderWatchlist()
getRemoveBtns()




function getRemoveBtns() {
setTimeout(() => {
    const removeBtn = document.querySelectorAll(".remove-btn")
    // console.log(removeBtn)
    removeBtn.forEach(btn => {
        btn.addEventListener('click', removeWatchItem)
    })
},600)
}


function renderWatchlist() {
    let ids = JSON.parse(localStorage.getItem('watchlist'))
    html = ""
    if(ids.length > 0){
        ids.forEach(id => {
            fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}&type=movie`)
                .then(res => res.json())
                .then(data => {
                    watchlistEl.innerHTML = showMovieHtml(data, 'watchlist')
                })
                .catch(watchlistEl.innerHTML = `<h3>Your watchlist is looking a little empty...</h3>
                <a><img src="./assets/Plus Icon.png" class="icon addWatchlist-icon" alt="Small Plus button">Let's add some movies!</a>`)
        })
    }else{
        watchlistEl.innerHTML = `<h3 class="error-text">Your watchlist is looking a little empty...</h3>
        <a href="./index.html" class="watchlist-btn center"><img src="./assets/Plus Icon.png" class="icon addWatchlist-icon" alt="Small Plus button">Let's add some movies!</a>`
    }
}


function removeWatchItem() {
    let removedId = this.id
    let watchlist = JSON.parse(localStorage.getItem('watchlist'))
    if(watchlist.length > 0){
        let filteredWatchlist = watchlist.filter((item) => {
            return item != removedId
        })
        watchlistEl.innerHTML = ""
        localStorage.clear()
        watchlist = filteredWatchlist
        localStorage.setItem('watchlist', JSON.stringify(filteredWatchlist))
        renderWatchlist()
        getRemoveBtns()
    }
}



function showMovieHtml(movie) {
    // console.log('movie:',movie)
    return html +=`
            <div class="card">
                <img class="movie-img" src= ${movie.Poster} alt="" />
                <div class="card-info">
                    <div class="row1">
                        <h3 class="movie-title">${movie.Title}</h3>
                        <p class="movie-rating"><img class="icon star-icon" src="./assets/Star Icon.png" alt="stars">${movie.imdbRating}</p>
                    </div>
                    <div class="row2">
                        <p class="movie-length">${movie.Runtime}</p>
                        <p class="movie-genre">${movie.Genre}</p>
                        <button id=${movie.imdbID} class="remove-btn btn"><img src="./assets/Minus Icon.png" class="icon addWatchlist-icon" alt="Small minus button"> Remove</button>
                    </div>
                    <p class="row3 movie-description">${movie.Plot}</p>
                </div>
            </div>
            `
}


// let removedId = this.id
// let watchlist = localStorage.getItem('watchlist').split(',')
// console.log('watchlist:', watchlist)
// localStorage.clear()
// watchlistEl.innerHTML = ""
// const filteredWatchlist = watchlist.filter(function(item) {
//     return item != removedId
// })
// localStorage.setItem('watchlist', filteredWatchlist)
// setTimeout(renderWatchlist, 1000)