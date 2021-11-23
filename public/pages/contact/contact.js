function sendContactMessage() {
    fetch("/api/contact", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        })  
    }).then(response => {
        if (response.status === 200) {
            toastr.info("Your message has been sent");
        } else {
            toastr.warning("Something went wrong! " + response.status);
        }
    });
}

document.getElementById("contact-button").addEventListener("click", sendContactMessage);