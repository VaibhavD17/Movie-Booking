import { BASC_URL } from "../../BASC_URL/BASC_URL.JS";

let updateId = null;

const hendleCinema = async () => {

    event.preventDefault();

    const cinema_name = document.getElementById("cinema_name").value;
    const cinema_description = document.getElementById("cinema_description").value;
    const cinema_phone = document.getElementById("cinema_phone").value;
    const cinema_address = document.getElementById("cinema_address").value;
    const cinema_email = document.getElementById("cinema_email").value;

    const obj = {
        cinema_name: cinema_name,
        cinema_description,
        cinema_phone,
        cinema_address,
        cinema_email
    }



    if (updateId) {
        try {
            await fetch(BASC_URL + "cinema/" + updateId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...obj, id: updateId })
            })
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
            await fetch(BASC_URL + "cinema", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then((response) => {
                    display()
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {

        }
    }


}

const display = async () => {

    const response = await fetch(BASC_URL + "cinema");
    const data = await response.json();

    let print = `
    <table border="1">
    <tr>
        <th colspan="7" class="table_data"><h2>Cinema Details</h2></th>
    </tr>
        <tr>
            <th class="table_heading">Name</th>
            <th class="table_heading">Description</th>
            <th class="table_heading">Phone No</th>
            <th class="table_heading">Address</th>
            <th class="table_heading">Email</th>
            <th class="table_heading" colspan="2">Action</th>
        </tr>
    
    `;

    data.map((v) => {
        print += `
            <tr>
                <td>${v.cinema_name}</td>
                <td>${v.cinema_description}</td>
                <td>${v.cinema_phone}</td>
                <td>${v.cinema_address}</td>
                <td>${v.cinema_email}</td>
                <td><button onclick=hendleEdit('${v.id}')><i class="fa-solid fa-pen" style="color: #068104;"></i></button></td>
                <td><button onclick="hendleDelete('${v.id}')"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></button></td>
            </tr>
        `;
    })
    print += `</table>`;

    document.getElementById("disp").innerHTML = print;
}

const hendleEdit = async (id) => {

    try {
        const response = await fetch(BASC_URL + "cinema")
        const data = await response.json();

        const obj = data.find((v) => v.id === id);

        document.getElementById("cinema_name").value = obj.cinema_name
        document.getElementById("cinema_description").value = obj.cinema_description
        document.getElementById("cinema_phone").value = obj.cinema_phone
        document.getElementById("cinema_address").value = obj.cinema_address
        document.getElementById("cinema_email").value = obj.cinema_email

        updateId = obj.id;

    } catch (error) {
        console.log(error);
    }
}

const hendleDelete = async (id) => {
    try {
        await fetch(BASC_URL + "cinema" + id, {
            method: "DELETE"
        })
            .then((response) => {
                display()
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

display();

const cinemaForm = document.getElementById("cinemaForm");
cinemaForm.addEventListener("submit", hendleCinema)
