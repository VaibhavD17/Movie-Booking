import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

const hendleDisplay = async () => {
    event.preventDefault();

    const timeResponse = await fetch( BASC_URL + "time")
    const timedata = await timeResponse.json();

    const movie_id = localStorage.getItem("movie_id")
    const cinema_id = localStorage.getItem("cinema_id")

    let print = '<div class="movie_time">'

    print += `
    <div class="ShowTime">
        <h3>Movie Time</h3>
    </div>
    `;

    let fdata = timedata.filter((v1) => v1.cinema_id === cinema_id && v1.movie_id === movie_id)

    console.log(fdata);

    fdata.map((m) => {
        m.time.map((v1) => {
            print += `
                <a href="" class="movieTime" onclick="hendleTime('${v1}')">
                <h3>${[v1]}</h3>
                 </a>`

                 console.log(v1);
        })
    })

    print += '</div>'

    document.getElementById("disp").innerHTML = print
}

const hendleTime = (time) => {

    event.preventDefault();

    localStorage.setItem("time", time)


    window.location.href = "http://127.0.0.1:5500/User/seatUser.html"

}

window.onload = hendleDisplay