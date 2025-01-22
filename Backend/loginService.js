function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // You can add your authentication logic here
    if (username === "admin" && password === "password") {
        document.getElementById("message").innerHTML = "Login successful!";
        window.location.href = "http://localhost:4200/"
    } else {
        document.getElementById("message").innerHTML = "Invalid username or password";
    }
}
