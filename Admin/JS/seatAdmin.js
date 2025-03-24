import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

let updateID = null

const hendleCinema = async () => {

    const response = await fetch(BASC_URL + "cinema");
    const data = await response.json();

    let print = '<option value="0">--Select Cinema--</option>'

    data.map((v) => {
        print += `<option value="${v.id}">${v.cinema_name}</option>`

    })
    document.getElementById("cinema").innerHTML = print
}

const hendleMovie = async () => {

    // event.preventDefault();

    const cinema_id = document.getElementById("cinema").value;

    // const fdata_id = cid !== null ? cid : cinema_id

    const response = await fetch(BASC_URL + "movie");
    const data = await response.json();

    let print = '<option value="0">--Select movie--</option>'

    let fData = data.filter((v) => v.cinemaId === cinema_id);

    fData.map((v) => {
        print += `<option value="${v.id}">${v.movie_name}</option>`

    })
    document.getElementById("movie").innerHTML = print

    // if (mid) {
    //     document.getElementById("movie").value = mid
    // }
}

const hendleTime = async () => {

    const movie_id = document.getElementById("movie").value

    const response = await fetch(BASC_URL + "time");
    const data = await response.json();

    let fData = data.filter((v) => v.movie_id === movie_id);

    let print = '<option value="0">--Select time--</option>'

    fData.map((v) => {
        v.time.map((item) => {
            print += `<option value="${item}">${item}</option>`
        })
    })
    document.getElementById("time").innerHTML = print
}

const hendleSubmit = async () => {
    event.preventDefault();

    const cinema_id = document.getElementById("cinema").value
    const movie_id = document.getElementById("movie").value
    const time = document.getElementById("time").value
    const seat = document.getElementById("seat").value
    const price = document.getElementById("price").value

    let arr = Array.from({
        length: seat
    }, () => 0)

    // const seat_no = []
    // for (let i=0; i<seat; i++) {
    //     seat_no.push(0) 
    // }

    const obj = {
        cinema_id: cinema_id,
        movie_id,
        time,
        seat: arr,
        price
    }

    if (updateID) {
        try {
            await fetch(BASC_URL + "seat/" + updateID, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...obj, id: updateID })
            })
                .then((response) => {
                    display();
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {

        }
    } else {
        try {
            await fetch(BASC_URL + "seat", {
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

const display = async () => {
    const seatResponse = await fetch(BASC_URL + "seat");
    const seatdata = await seatResponse.json();

    const movieResponse = await fetch(BASC_URL + "movie");
    const moviedata = await movieResponse.json();

    const cinemaResponse = await fetch(BASC_URL + "cinema");
    const cinemadata = await cinemaResponse.json();

    let print = `
    <table border="1">
        <tr><th colspan="7" class="table_data">Seat Details</th></tr>
        <tr>
            <th class="table_heading">Cinema Name</th>
            <th class="table_heading">Movie Name</th>
            <th class="table_heading">Show Time</th>
            <th class="table_heading">Seat</th>
            <th class="table_heading">Price</th>
            <th class="table_heading" colspan="2">Action</th>
        </tr>
    
    `;

    seatdata.map((v) => {
        const cinema = cinemadata.filter((c) => c.id === v.cinema_id)[0]?.cinema_name
        const movie = moviedata.filter((m) => m.id === v.movie_id)[0]?.movie_name

        print += `
            <tr>
                <td>${cinema}</td>
                <td>${movie}</td>
                <td>${v.time}</td>
                <td>${v.seat.length}</td>
                <td>${v.price}</td>
                <td>
                    <button onclick="hendleEdit('${v.id}')">
                        <i class="fa-solid fa-pen" style="color: #146127;"></i>
                    </button>
                </td>
                <td>
                    <button onclick="hendleDelete('${v.id}')">
                        <i class="fa-solid fa-trash" style="color: #ff0000;"></i>
                    </button>
                </td>
            </tr>
        `;
    })


    print += `</table>`

    document.getElementById("disp").innerHTML = print

}

const hendleDelete = async (id) => {

    console.log(id);

    try {
        await fetch(BASC_URL + "seat/" + id, {
            method: "DELETE"
        })
            .then((response) => display())
            .catch((error) => console.log(error))
    } catch (error) {

    }
}

const hendleEdit = async (id) => {

    const response = await fetch(BASC_URL + "seat");
    const data = await response.json();

    const obj = data.find((v) => v.id === id);

    document.getElementById("cinema").value = obj.cinema_id
    await hendleMovie()

    document.getElementById("movie").value = obj.movie_id
    await hendleTime()

    document.getElementById("time").value = obj.time
    document.getElementById("seat").value = obj.seat.length
    document.getElementById("price").value = obj.price

    updateID = id;
}

display();
window.onload = hendleCinema

const cinema = document.getElementById("cinema");
cinema.addEventListener("change", hendleMovie)

const movie = document.getElementById("movie");
movie.addEventListener("change", hendleTime)

const seatform = document.getElementById("seatform");
seatform.addEventListener("submit", hendleSubmit)