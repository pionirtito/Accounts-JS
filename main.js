// console.log(db); //radi jer je src u indexu

window.addEventListener('beforeunload', save); //dodato zbog local storage

let accountsTableBody = document.querySelector("#accounts-table-body");
// let accountsViewBtn = document.querySelector('[href="accounts-view"]');
// let addAccountsViewBtn = document.querySelector('[href="add-account-view"]');
let accountsView = document.querySelector('#accounts-view');
let addAccountView = document.querySelector('#add-account-view');
let allLinks = document.querySelectorAll('.nav-link');
let views = document.querySelectorAll('.view');

let idInput = document.querySelector('[placeholder="id"]');
let nameInput = document.querySelector('[placeholder="name"]');
let lastNameInput = document.querySelector('[placeholder="lastname"]');
let emailInput = document.querySelector('[placeholder="email"]');
let phoneInput = document.querySelector('[placeholder="phone"]');
let saveBtn = document.querySelector('#save');

let eId = document.querySelector('.eId');
let eName = document.querySelector('.eName');
let eLastName = document.querySelector('.eLastName');
let eEmail = document.querySelector('.eEmail');
let ePhone = document.querySelector('.ePhone');
let editBtn = document.querySelector('#edit');

let id; // napravili smo da bude globalna da bi bila dostupna u edit

editBtn.addEventListener('click', saveEditedAccount);
saveBtn.addEventListener('click', saveAccount);

function saveEditedAccount() {
    const editedAccount = {
        id : eId.value,
        name : eName.value,
        lastname : eLastName.value,
        email : eEmail.value,
        phone : ePhone.value
    }

    // console.log(editedAccount);
    db[id] = editedAccount;
    createAccountsTable();
    showView('#accounts-view')
}

function saveAccount() {
    const newAccount = {
        id : idInput.value,
        name : nameInput.value,
        lastname : lastNameInput.value,
        email : emailInput.value,
        phone : phoneInput.value
    }
    // console.log(newAccount);
    db.push(newAccount); // dodaje inpute u db

    // brisanje polja nakon klika save
    idInput.value = "";
    nameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";


    createAccountsTable(); // mora da se pozove da bi renderovalo ... prikazlo nove vrednosti u tabeli
    showView("#accounts-view"); // mora da se pozove ako zelimo da odmah po unosu se vidi tabla sa acocuntima ... !!! vidi prepravku dole
}

// console.log(accountsViewBtn); // test

// addAccountsViewBtn.addEventListener('click', function(e){
//     e.preventDefault();
//     addAccountView.style.display = "block";
//     accountsView.style.display = "none";
// });

// accountsViewBtn.addEventListener('click', function(e){
//     e.preventDefault();
//     addAccountView.style.display = "none";
//     accountsView.style.display = "block";
// });

for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click', showView);
    
}

// Show view ... pre prepravke
/*
function showView(e){
    e.preventDefault();
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = "none"; // sakriva sve views
        
    }
    let id = `#${this.getAttribute("href")}`;
    document.querySelector(id).style.display = "block"; // prikazuje kliknuti
}
*/

// Show view sa preppravkom
// !!! Prepravka se radi da bismo mogili da pozovemo funkciju bez Eventa jer nam je potrebna u saveAccount f-ji
function showView(e){
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = "none"; // sakriva sve views
        
    }

    if (e instanceof Event) { // proverava da li je e event (CLICK)
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;// id dobija naziv iz href-a
        document.querySelector(id).style.display = "block"; // prikazuje kliknuti
        
    } else { // NEMA CLICK
        document.querySelector(e).style.display = "block";
    }

}

createAccountsTable();

function createAccountsTable() {
    let htmlAccounts = ``;
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        htmlAccounts += `
        <tr>
            <td>${account.id}</td>
            <td>${account.name}</td>
            <td>${account.lastname}</td>
            <td>${account.email}</td>
            <td>${account.phone}</td>
            <td><button data-id="${i}" class="edit-btn btn btn-sm btn-warning form-control">Edit</button></td>
            <td><button data-id="${i}" class="delete-btn btn btn-sm btn-danger form-control">Delete</button></td>
        </tr>
        `
    }
    // console.log(htmlAccounts);
    accountsTableBody.innerHTML = htmlAccounts;
    let allDeleteBtns = document.querySelectorAll('.delete-btn');
    let allEditBtns = document.querySelectorAll('.edit-btn');

    for (let i = 0; i < allDeleteBtns.length; i++) {
        allDeleteBtns[i].addEventListener('click', deleteAccount);
        allEditBtns[i].addEventListener('click', editAccount);
    }
}

function deleteAccount(){
    let id = this.getAttribute('data-id');
    // console.log(id);
    db.splice(id,1); // sa pozicije id skini samo jedan account
    createAccountsTable();
    showView('#accounts-view');
}

function editAccount() {
    id = this.getAttribute('data-id');// bilo LET pre nego sto smo napravili globalnu
    let selectedAccount = db[id];
    eId.value = selectedAccount.id;
    eName.value = selectedAccount.name;
    eLastName.value = selectedAccount.lastname;
    eEmail.value = selectedAccount.email;
    ePhone.value = selectedAccount.phone;

    showView('#edit-account-view');
}

function save(){
    localStorage.db = JSON.stringify(db);//iz array u string
}
