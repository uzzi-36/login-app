let page = location.href.split("/");
page = page[page.length - 1];

let users = []
let loggedin = []
function getAllUsers() {
    let userInStringForm = localStorage.getItem("users");
    let loggedinForm = localStorage.getItem("logged in");
    users = JSON.parse(userInStringForm) || [];
    loggedin = JSON.parse(loggedinForm) || {};
    console.log(users);
    console.log(loggedin);
}
getAllUsers();

function diplayDashboard() {
    if (page === "information.html") {
        getAllUsers();

        let userName = document.getElementById('userName');
        // let userAddress = document.getElementById('userAddress');
        let userEmail = document.getElementById('userEmail');

        console.log(loggedin);

        userName.innerText = loggedin.user_firstname + loggedin.user_lastname;
        // userAddress.innerText = loggedin.user_address;
        userEmail.innerText = loggedin.user_email;
        console.log("loggedin.user_firstname: ", loggedin);
    }
}
diplayDashboard();

function signup() {
    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmpassword = document.getElementById('confirmpassword');

    if (password.value === confirmpassword.value) {
        // get details from signup inputs
        let newUser = {
            user_firstname: firstname.value,
            user_lastname: lastname.value,
            user_email: email.value,
            user_password: password.value,
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].user_email === email.value) {
                alert("Email already exists");
                return;
            }
        }
        console.log(newUser);
        users.push(newUser)

        localStorage.setItem("users", JSON.stringify(users))
        alert("Registration Sucssfully Completed Please sign in");
        window.location.href = "./login.html";
    }
    else {
        alert("Password does not match");
    }
    // message.innerHTML = "Thanks" +" "+lastname.value + " " + "is successfully sign up";
    // console.log(message);
}


function login() {
    let login_email = document.getElementById("login_email");
    let login_password = document.getElementById("login_password");

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].user_password == login_password.value &&
            users[i].user_email == login_email.value
        ) {
            localStorage.setItem("logged in", JSON.stringify(users[i]));
            window.location.href = "./information.html";
            break;
        } else if (
            users[i].user_password !== login_password.value &&
            users[i].user_email !== login_email.value
        ) {
        }
    }
}

function logout() {

    localStorage.removeItem("logged in");
    window.location.href = "./login.html";

}