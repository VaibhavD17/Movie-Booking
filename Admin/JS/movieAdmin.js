import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

let updateId = null;

const hendleCinema = async () => {
    const response = await fetch(BASC_URL + "cinema");
    const data = await response.json();

    let print = `<option value="0">--Select Cinema--</option>`

    data.map((v) => {
        print += `<option value="${v.id}">${v.cinema_name}</option>`
    });

    document.getElementById("cinema").innerHTML = print;
}


const hendleMovie = async () => {
    event.preventDefault();

    const cinemaId = document.getElementById("cinema").value
    const movie_name = document.getElementById("movie_name").value
    const movie_description = document.getElementById("movie_description").value
    let movie_poster = ''

    if (document.getElementById("movie_poster").files[0]) {
        movie_poster = document.getElementById("movie_poster").files[0].name
    } else {
        let path = document.getElementById("poster_img").src

        let arr = path.split("/");

        let imageName = arr[arr.length - 1]

        movie_poster = imageName

    }

    console.log(cinemaId);


    let obj = {
        cinemaId: cinemaId,
        movie_name,
        movie_description,
        movie_poster
    }


    if (updateId) {
        try {
            await fetch(BASC_URL + "movie/" + updateId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...obj, id: updateId })

            })
            console.log(obj)
                .then((response) => {
                    display();
                })
                .catch((error) => {
                    console.log(error);
                })


            updateId = null;

        } catch (error) {

        }
    } else {
        try {
            await fetch(BASC_URL + "movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then((response) => {
                    display();
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {

        }
    }
}

const hendleDelete = async (id) => {
    try {
        await fetch(BASC_URL + "movie/" + id, {
            method: "DELETE"
        })
            .then((response) => {
                display();
            })
            .catch((error) => console.log(error))

    } catch (error) {

    }
}

const hendleEdit = async (id) => {

    try {
        const response = await fetch(BASC_URL + "movie");
        const data = await response.json();

        const obj = data.find((v) => v.id === id);

        document.getElementById("cinema").value = obj.cinemaId
        document.getElementById("movie_name").value = obj.movie_name
        document.getElementById("movie_description").value = obj.movie_description
        document.getElementById("poster_img").src = 'images/' + obj.movie_poster

        updateId = obj.id;

    } catch (error) {
        console.log(error);
    }
}

const hendleImage = () => {

    const posterFile = movie_poster.files[0].name
    document.getElementById("poster_img").src = 'images/' + posterFile
}

const display = async () => {
    const responseMovie = await fetch(BASC_URL + "movie");
    const movieData = await responseMovie.json();

    const responseCinema = await fetch(BASC_URL + "cinema");
    const cinemadata = await responseCinema.json();



    let print = ''

    movieData.map((v) => {

        const data = cinemadata.filter((item) => item.id === v.cinemaId)[0]?.cinema_name

        console.log(data);

        print += `
            <div class="moviepost_style">
                <h4 class="h3heading">${v.movie_name}</h4>
                <img src="Images/${v.movie_poster}">
                <div>
                    <p class="descrip">${data}</p>
                    <p class="descrip Pdata">${v.movie_description}</p>
                    <div class="buttontag">
                        <button class="button_edit"  onclick=hendleEdit('${v.id}')><i class="fa-solid fa-pen" style="color: #068104;"></i></button>
                        <button class="button_delete" onclick=hendleDelete('${v.id}')><i class="fa-solid fa-trash" style="color: #ff0000;"></i></button>
                    </div>
                </div>
        `;
        print += `</div>`
    })
    document.getElementById("disp").innerHTML = print
}
window.onload = hendleCinema
display();

const movieForm = document.getElementById("movieForm");
movieForm.addEventListener("submit", hendleMovie)