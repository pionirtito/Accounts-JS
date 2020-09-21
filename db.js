let db = [];

if(localStorage.db){ // ako postoji da ucita iz localStorage
    db = JSON.parse(localStorage.db);// iz stringa u array
}



// let db = [
//     {
//         id: 1,
//         name: "Nikola",
//         lastname: "Savic",
//         email: "nikola@nanofaktura.com",
//         phone: "11-11-11-11"
//     },
//     {
//         id: 2,
//         name: "Neda",
//         lastname: "Cvetkovic",
//         email: "neda@nanofaktura.com",
//         phone: "22-22-22-22"
//     },
//     {
//         id: 3,
//         name: "Senka",
//         lastname: "Savic",
//         email: "senka@nanofaktura.com",
//         phone: "22-22-22-22"
//     }
// ];