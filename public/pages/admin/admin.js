function login() {
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        })
    }).then(res => {
        if (res.status == 200) {
            res.redirect("/dashboard")
                }
        else {
            console.log(res.status)
        }
    }) 
}
document.getElementById("login-button").addEventListener("click", login)