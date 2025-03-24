import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

let updateID = null;

const hendleCinema = async () => {
    const response = await fetch(BASC_URL + "cinema")
    const data = await response.json();

    let print = '<option value="0">--Select Cinema--</option>'

    data.map((v) => {
        print += `<option value="${v.id}">${v.cinema_name}</option>`
    })

    document.getElementById("cinema").innerHTML = print
}

const hendleMovie = async (cid = null, mid = '') => {
    const cinema_id = document.getElementById("cinema").value

    const response = await fetch(BASC_URL + "movie")
    const data = await response.json();

    // console.log(cinema_id);

    // const fdata_id = cid!==null ? cid : cinema_id;



    let print = `<option value="0">--Select Cinema--</option>`

    let fData = data.filter((v) => v.cinemaId === cinema_id)

    fData.map((v) => {
        print += `<option value="${v.id}">${v.movie_name}</option>`
    })

    document.getElementById("movie").innerHTML = print

    if (mid) {
        document.getElementById("movie").value = mid
    }
}

const hendleTime = (event, val = '') => {

    event.preventDefault();

    const parentDiv = document.getElementById("all_time")

    let rNo = Math.floor(Math.random() * 10000)

    const divEle = document.createElement("div")
    divEle.setAttribute("id", `row-${rNo}`)

    const timeEle = document.createElement("input")
    timeEle.setAttribute("type", "time");
    timeEle.setAttribute("name", "time")
    timeEle.setAttribute("value", val)

    divEle.appendChild(timeEle)

    const buttonAdd = document.createElement("button")
    buttonAdd.textContent = "+"
    buttonAdd.setAttribute("onclick", `hendleTime(event)`)
    buttonAdd.setAttribute("class", "addButton")

    divEle.appendChild(buttonAdd)

    if (parentDiv.childNodes.length >= 1) {
        const buttonRemove = document.createElement("button")
        buttonRemove.textContent = "-"
        buttonRemove.setAttribute("onclick", `buttonRemove('row-${rNo}')`)
        buttonRemove.setAttribute("class", "removeButton")

        divEle.appendChild(buttonRemove)
    }
    parentDiv.appendChild(divEle)

}

const buttonRemove = (id) => {

    const deleteEle = document.getElementById(id);
    deleteEle.remove();
}

const hendleSubmit = async () => {
    event.preventDefault();

    const cinema_id = document.getElementById("cinema").value;
    const movie_id = document.getElementById("movie").value;

    const timeData = document.getElementsByName("time")

    let allTime = [];

    for (let i = 0; i < timeData.length; i++) {
        allTime.push(timeData[i].value)
    }

    const obj = {
        cinema_id: cinema_id,
        movie_id,
        time: allTime
    }

    if (updateID) {
        try {
            await fetch(BASC_URL + "time/" + updateID, {
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
            await fetch(BASC_URL + "time/", {
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

const hendleEdit = async (event, tid) => {
    const response = await fetch(BASC_URL + "time");
    const data = await response.json();

    const obj = data.find((v) => v.id === tid);

    document.getElementById("cinema").value = obj.cinema_id

    hendleMovie(obj.cinema_id, obj.movie_id);

    document.getElementById("all_time").innerHTML = ''

    for (let i = 0; i < obj.time.length; i++) {
        hendleTime(event, obj.time[i])
    }

    updateID = tid;

}

const hendleDelete = async (id) => {

    console.log(id);
    try {
        await fetch(BASC_URL + "time/" + id, {
            method: "DELETE"
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

const display = async () => {
    const responsetime = await fetch(BASC_URL + "time")
    const data = await responsetime.json();

    const responseMovie = await fetch(BASC_URL + "movie");
    const movieData = await responseMovie.json();

    const responseCinema = await fetch(BASC_URL + "cinema");
    const cinemadata = await responseCinema.json();

    let print = `
    <table border="1">
        <tr><th colspan="5" class="table_data"><h4>TIME</h4></th></tr>
        <tr>
            <th class="table_heading">Cinema</th>
            <th class="table_heading">Movie</th>
            <th class="table_heading">Time</th>
            <th class="table_heading" colspan="2">Action</th>
        </tr>
    `;
    data.map((v) => {
        const movie = movieData.filter((m) => m.id === v.movie_id)[0]?.movie_name
        const cinema = cinemadata.filter((c) => c.id === v.cinema_id)[0]?.cinema_name

        print += `
            <tr>
                <td>${cinema}</td>
                <td>${movie}</td>
                <td>${v.time}</td>
                <td>
                    <button onclick="hendleEdit(event,'${v.id}')">
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

    print += '</table>'

    document.getElementById("disp").innerHTML = print
}

window.onload = hendleCinema

display();

const cinema = document.getElementById("cinema");
cinema.addEventListener("change", hendleMovie)

const timeForm = document.getElementById("timeForm");
timeForm.addEventListener("submit", hendleSubmit)
