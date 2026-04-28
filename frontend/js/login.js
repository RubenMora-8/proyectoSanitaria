const formularioLogin = document.getElementById('formularioLogin');
const formRecovery = document.getElementById("formRecovery");

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

    if (!resJSON.error) {
        setCookie(resJSON.token);

        sessionStorage.setItem("tipo",resJSON.user.tipo);
        sessionStorage.setItem("id_tec",resJSON.user.id_tec);
        window.location = "./pages/aplicacion.html";
    } else {
        showMessage(resJSON.error);
    }
}

const setCookie = (value) => {

    const maxAge = 60 * 60 * 24;
    document.cookie = "tokenCookie=" + value + ";max-age=" + maxAge + ";path=/";
}

const passRecovery = async (event) => {
    event.preventDefault();
    const formData = new FormData(formularioLogin);

}

formularioLogin.addEventListener("submit", loginUser);
formRecovery.addEventListener("submit", passRecovery)