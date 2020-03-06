let data = [];
let count = 1;
var contactsList = $("#contactsList");
var selected;
function insertContact(contact) {
    $("#contactsList").append(
        `<li id="${contact.id}"><a href="#NewContact" onclick="select(${contact.id})">
    <img src="${contact.gender}.png">
    <h2>${contact.name}</h2>
    <p>${contact.phone}</p>
    </a>
    <a href="tel:+" data-icon="phone"></a>
    </li>`);
}

savedData = localStorage.getItem("contacts");
    if(savedData) {
        data = JSON.parse(savedData);
        for (i in data) {
            let contact = data[i];
            count++;
            insertContact(contact);
        }
    }
function select(id) {
    contact = data.filter(c => c.id == id)[0];
    $("#name").val(contact.name);
    $("#mobile").val(contact.phone);
    $("#email").val(contact.email);
    let g;
    if (contact.gender === "male") {
        g = "on";
    } else {
        g = "off"
    }
    $("#flip-1").val(g);
    selected = contact;
}

function newContact() {
    $('input[type="text"]').val("")
    $("#flip-1").val("off");
    selected = undefined;
}

function validateName() {
    let regName = /^[a-zA-Z]+$/;
    return regName.test($("#name").val());
}

function validateEmail() {
    let emailRegix = /^[A-Za-z0-9+_.-]+@(.+)$/;
    return emailRegix.test($("#email").val());
}

function validatePhone() {
    let phoneRegex = /\d{11}/;
    return phoneRegex.test($("#mobile").val());
}
function saveContact() {
    if(validateName() && validatePhone() && validateEmail()) {
        if(selected) {
            selected.name = $("#name").val();
            selected.phone = $("#mobile").val();
            selected.email = $("#email").val();
            selected.gender = $("#flip-1").val() == "on" ? "male" : "female";
            $(`li[id="${selected.id}"]`).find("p").first().text(selected.phone);
            $(`li[id="${selected.id}"]`).find("h2").first().text(selected.name);
            $(`li[id="${selected.id}"]`).find("img").first().attr({"src" : selected.gender + ".png"});
        }
        else {
            let contact = {
                name: $("#name").val(),
                phone: $("#mobile").val(),
                email: $("#email").val(),
                gender: $("#flip-1").val() == "on" ? "male" : "female",
                id: count++
            }
            data.push(contact);
            insertContact(contact);
        }
        localStorage.setItem('contacts', JSON.stringify(data));
        $.mobile.navigate("#contacts");
        selected = undefined;
    }
}
