import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

let selectSeat = [];

let seatIndex = [];

const hendleDisplay = async () => {

    const cinemaID = localStorage.getItem("cinema_id")
    const time = localStorage.getItem("time")
    const movieId = localStorage.getItem("movie_id")

    const seatResponse = await fetch(BASC_URL + "seat");
    const seatData = await seatResponse.json();


    let print = '<div class="seat_button"> '

    const fData = seatData.filter((v) =>
        v.cinema_id === cinemaID &&
        v.movie_id === movieId &&
        v.time === time
    )


    fData.map((v) => {
        v.seat.map((v1, i) => {
            console.log(v);
            if (v.seat[i] === 1) {
                print +=
                    `<button id="seat-${i + 1}" disabled = true onclick="hendleSeat('${i + 1}','${v.price}','${v.id}')">${i + 1}</button>`
                seatIndex.push(v1)
            } else {
                print +=
                    `<button id="seat-${i + 1}" onclick="hendleSeat('${i + 1}','${v.price}','${v.id}')">${i + 1}</button>`
                seatIndex.push(v1)
            }
        })
        document.getElementById("priceData").innerHTML = v.price
    })


    print += `</div>`

    document.getElementById("disp").innerHTML = print
}

const hendleSeat = async (index, price, id) => {
    event.preventDefault();

    if (selectSeat.includes(index)) {
        selectSeat.splice(selectSeat.indexOf(index), 1)
        document.getElementById(`seat-${index}`).style.background = ""
    } else {
        selectSeat.push(index)
        document.getElementById(`seat-${index}`).style.background = "rgb(0, 229, 255)"
    }

    for (let i = 0; i <= seatIndex.length; i++) {
        if ((index - 1) === i) {
            if (seatIndex[i] === 1) {
                const butoon = document.getElementById(`seat-${index}`);
                butoon.style.backgroundColor = ""
                seatIndex[i] = 0;
            } else {
                seatIndex[i] = 1;
            }
        }
    }


    const total_price = price * selectSeat.length

    let display = `
    <div class="jsPriceMain">
                <div class="jsPrice">
                    <h3>Total Seat</h3>
                    <h2>${selectSeat.length}</h2>
                </div>
                <hr>
                <div class="jsPrice">
                    <h3>Price</h3>
                    <h2>${price}</h2>
                </div>
                <hr>
                <div class="jsPrice">
                    <h3>Total Bill </h3>
                    <h2>${total_price}</h2>
                </div>
                <hr>
                <div class="SubmitJS">
                    <button class="seatSubmit" onclick="hendleSubmit('${id}', '${price}')">Submit</button>
                </div>
            </div>
    `;

    document.getElementById("price").innerHTML = display

}

const hendleSubmit = async (id, price) => {

    seatIndex.forEach((seat, i) => {
        if (seat === 1) {
            const butoon = document.getElementById(`seat-${i + 1}`)
            butoon.disabled = true;
        }
    });

    const cinema_id = localStorage.getItem("cinema_id");
    const movie_id = localStorage.getItem("movie_id");
    const time = localStorage.getItem("time");

    let obj = {
        id: id,
        cinema_id,
        movie_id,
        time,
        price
    }

    console.log(obj);

    try {
        await fetch(BASC_URL + "seat/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...obj, seat: seatIndex })
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    } catch (error) {

    }

    window.location.href = "http://127.0.0.1:5500/User/thankyou.html"
}

window.onload = hendleDisplay


// let selectSeat = [];
// let seatIndex = [];

// const hendleDisplay = async () => {
//     const cinema_id = localStorage.getItem("cinema_id");
//     const movie_id = localStorage.getItem("movie_id");
//     const time = localStorage.getItem("time");

//     const response = await fetch("http://localhost:3000/seat");
//     const data = await response.json();

//     console.log(data);

//     const fData = data.filter((v) =>
//         v.cinema_id === cinema_id &&
//         v.movie_id === movie_id &&
//         v.time === time
//     )

//     let print = '<div class="seat_button">'

//     fData.map((v) => {
//         v.seat.map((v1, i) => {
//             if (v.seat[i] === 1) {
//                 print += `
//                 <button id="seat-${i + 1}" disabled = true onclick="hendleSeat(${i + 1}, ${v.id}, ${v.price})">${i + 1}</button>`;
//                 seatIndex.push(v1)
//             } else {
//                 print += `
//                 <button id="seat-${i + 1}"  onclick="hendleSeat(${i + 1}, ${v.id}, ${v.price})">${i + 1}</button>`;
//                 seatIndex.push(v1)
//             }
//         })
//     })
//     print += `</div>`

//     document.getElementById("disp").innerHTML = print

// }

// const hendleSeat = (index, id, price) => {
//     // console.log(index, id, price);

//     if (selectSeat.includes(index)) {
//         selectSeat.splice(selectSeat.indexOf(index), 1)
//         document.getElementById(`seat-${index}`).style.backgroundColor = ""
//     } else {
//         selectSeat.push(index)
//         document.getElementById(`seat-${index}`).style.backgroundColor = "red"
//     }

//     for (let i = 0; i <= seatIndex.length; i++) {
//         if ((index - 1) === i) {
//             if (seatIndex[i] === 1) {
//                 document.getElementById(`seat-${index}`).style.backgroundColor = ""
//             } else {
//                 seatIndex[i] = 1
//             }
//         }
//     }


//     let total_price = price * selectSeat.length;

//     let display = ''
//     display += `<div>`
//     display += `<span>Total Seat:- </span>`
//     display += `<span>${selectSeat.length}</span><br>`
//     display += `<span>Price:- </span>`
//     display += `<span>${price}</span><br>`
//     display += `<span>Total Price:- </span>`
//     display += `<span>${total_price}</span>`
//     display += `</div>`
//     display += `<div>`
//     display += `<button onclick="hendleSubmit('${id}', '${price}')">Submit</button>`
//     display += `</div>`

//     document.getElementById("price").innerHTML = display


// }

// const hendleSubmit = async (id, price) => {
//     event.preventDefault();

//     seatIndex.forEach((seat, i) => {
//         if (seat === 1) {
//             const button = document.getElementById(`seat-${i + 1}`).style.backgroundColor = ""
//             button.disabled = true
//         }
//     })

//     const cinema_id = localStorage.getItem("cinema_id")
//     const movie_id = localStorage.getItem("movie_id")
//     const time = localStorage.getItem("time")

//     const obj = {
//         id: id,
//         cinema_id,
//         movie_id,
//         time,
//         price
//     }

//     try {
//         await fetch("http://localhost:3000/seat/" + id, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ ...obj, seat: seatIndex })

//         })
//         .then((response) => console.log(response))
//         .catch((error) => console.log(error))
//     } catch (error) {

//     }
// }


// window.onload = hendleDisplay


