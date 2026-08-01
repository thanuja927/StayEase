// ================= PASSWORD SHOW / HIDE =================

function togglePassword() {

    const password = document.getElementById("password");
    const eye = document.querySelector(".eye");

    if (password.type === "password") {

        password.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");

    } else {

        password.type = "password";
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");

    }

}


// ================= LOGIN VALIDATION =================

document.getElementById("loginForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "") {

        alert("Please enter your email.");
        return;

    }

    if (password === "") {

        alert("Please enter your password.");
        return;

    }

    // Dummy Login (Frontend Only)

    alert("Login Successful!");

    // Redirect to Profile Page

    window.location.href = "profile.html";

});