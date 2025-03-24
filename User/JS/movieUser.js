import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

const hendleDisplay =async () => {
    event.preventDefault();

    const response = await fetch( BASC_URL + "movie")
    const data = await response.json();

    const localData = localStorage.getItem("cinema_id")

    let fdata = data.filter((v) => v.cinemaId === localData) 

    let print = ''

    fdata.map((v) => {
            print += `
            <a href=""  onclick="hendleMovie('${v.id}')" class="moviepost_style" >
            <img src="/Admin/Images/${v.movie_poster}">
            <h4 class="h3heading">${v.movie_name}</h4>
            `;
    })

    print += '</a>'

    document.getElementById("disp").innerHTML = print
}

const hendleMovie = (id) => {
    event.preventDefault();

    localStorage.setItem("movie_id", id)

    window.location.href = "http://127.0.0.1:5500/User/timeUser.html"

}


window.onload = function () {
    hendleDisplay();
} 