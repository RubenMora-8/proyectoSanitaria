const formularioLogin = document.getElementById('formularioLogin');

const loginUser = (event) => {
    event.preventDefault();

    const formData = new FormData(formularioLogin);
    const formJSON = Object.fromEntries(formData.entries());

    sendLoginJson(formJSON);
}

const sendLoginJson = async (userJson) => {
    const res = await fetch("http://www.localhost:3000/api/tecs/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userJson)
    });
    const resJSON = await res.json();
    console.log(resJSON.token);

    if (!resJSON.error) {
        setCookie(resJSON.token);
        window.
    }
}

function setCookie(value) {
    const maxAge = 60 * 60 * 24;
    document.cookie = "tokenCookie=" + value + ";max-age=" + maxAge + ";path=/";
}

formularioLogin.addEventListener("submit", loginUser);
botonLogin.addEventListener("click", () => { console.log("boton pulsado") });