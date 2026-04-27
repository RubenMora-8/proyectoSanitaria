const formularioLogin = document.getElementById('formularioLogin');

const loginUser = (event) => {
    event.preventDefault();

    console.log("login");
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
    console.log(resJSON);

    showMessage(resJSON.error);
}

formularioLogin.addEventListener("submit", loginUser);
botonLogin.addEventListener("click", () => { console.log("boton pulsado") });