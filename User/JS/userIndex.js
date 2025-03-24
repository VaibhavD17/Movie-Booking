import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

const hendleDisplay = async () => {
    const response = await fetch(BASC_URL + "cinema");
    const data = await response.json();

    let print = ``

    data.map((v) => {
        print += `<a href="#" onclick="hendleCinema('${v.id}')">
        <div class="cinemadiv">
        <h2>${v.cinema_name}</h2>
        <img src="/Admin/Images/cinemaposter.jpg" alt="">
        </div>`;
    })

    print += '</a>'
    document.getElementById("cinema_list").innerHTML = print
}

const hendleCinema = async (id) => {

    event.preventDefault()

    localStorage.setItem("cinema_id", id)

    window.location.href = "http://127.0.0.1:5500/User/movieUser.html"

}



const movieDisplay = async () => {
    const movieResponse = await fetch(BASC_URL + "movie")
    const movieData = await movieResponse.json();

    let uniqArr = [];

    let printmovie = ''

    movieData.map((v) => {
        let flg = 0;
        uniqArr.map((u) => {
            if (u.movie_name === v.movie_name) {
                flg = 1;
            }
        })

        if (flg === 0) {
            uniqArr.push({ movie_name: v.movie_name, movie_poster: v.movie_poster })
        }
    })

    printmovie += ''

    uniqArr.map((u1) => {
        printmovie += `<a href=""  onclick="hendleMovie('${u1.movie_name}')" class="moviepost_style" >`
        printmovie += `<img src="/Admin/Images/${u1.movie_poster}">`
        printmovie += `<h4 class="h3heading">${u1.movie_name}</h4>`;
    })

    printmovie += '</a>'

    document.getElementById("movie_list").innerHTML = printmovie

}

const hendleMovie = async (movie) => {
    event.preventDefault();

    localStorage.setItem("movie_Name", movie)

    window.location.href = "http://127.0.0.1:5500/User/cinemaUser.html"
}

window.onload = function () {
    movieDisplay();
    hendleDisplay()
} 
