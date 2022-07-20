const key = '4c48d0a6';


const searchBar = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn')
const movieList = document.querySelector('.movie-list')
const watchlistEl = document.querySelector('.watchlist-list')


let html = ""
let watchlistArr = []


searchBtn.addEventListener('click', search)
showMovieHtml()

// localStorage.clear()




// Search for the names of the top 5 search results
function search() {
    let searchTerm = searchBar.value
    html = ""
    const url = `http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}&type=movie`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let choppedData = data.Search.slice(0, 5)
            // console.log(choppedData)
            choppedData.forEach((film)=> {
                getIMDBInfo(film)
            })
        })
        .catch(movieList.innerHTML = `<h3 class="error-text">Unable to find what you're looking for. Please try another search</h3>`)
}

// Use the names and imdbID to find more info on each title and render them to the DOM
function getIMDBInfo(searchData) {
    const imdbID = searchData.imdbID
    fetch(`http://www.omdbapi.com/?apikey=${key}&i=${imdbID}&type=movie`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            movieList.innerHTML = showMovieHtml(data, 'index')
            const watchlistBtn = document.querySelectorAll('.watchlist-btn')
            watchlistBtn.forEach((btn) => {
                btn.addEventListener('click', addToWatchlist)
            })    
        })
        .catch(movieList.innerHTML = `<h3 class="error-text">Unable to find what you're looking for. Please try another search</h3>`)
}


// Add new info to the html
function showMovieHtml(movie) {
    if(movie){
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
                        <button id=${movie.imdbID} class="watchlist-btn btn"><img src="./assets/Plus Icon.png" class="icon addWatchlist-icon" alt="Small Plus button"> Watchlist</button>
                    </div>
                    <p class="row3 movie-description">${movie.Plot}</p>
                </div>
            </div>
            `
    }else{
        return `            
        <div class="empty-search-container">
            <img src="./assets/filmIcon.png" class="centered-icon" />
            <p class="background-text">Start exploring</p>
        </div>
        `
    }
}

function addToWatchlist() {
    watchlistArr = JSON.parse(localStorage.getItem('watchlist')) || []
    // console.log('watchlist before added:', watchlistArr)
    watchlistArr.push(this.id)
    // console.log('watchlist after added:', watchlistArr)
    localStorage.setItem('watchlist', JSON.stringify(watchlistArr))
}



// const {Title, Genre, Plot, imdbRating, Runtime, Poster} = data

//        `
//             <div class="card">
//                 <img class="movie-img" src= ${movie.Poster} alt="" />
//                 <div class="card-info">
//                     <div class="row1">
//                         <h3 class="movie-title">${movie.Title}</h3>
//                         <p class="movie-rating"><img class="icon star-icon" src="./assets/Star Icon.png" alt="stars">${movie.imdbRating}</p>
//                     </div>
//                     <div class="row2">
//                         <p class="movie-length">${movie.Runtime}</p>
//                         <p class="movie-genre">${movie.Genre}</p>
//                         <button class="watchlist-btn btn"><img src="./assets/Plus Icon.png" class="icon addWatchlist-icon" alt="Small Plus button"> Watchlist</button>
//                     </div>
//                     <p class="row3 movie-description">${movie.Plot}</p>
//                 </div>
//             </div>
//             `