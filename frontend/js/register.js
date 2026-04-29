const registerUser = (event) => {
    event.preventDefault();
    const formData = new FormData(formularioRegistro);
    const formJSON = Object.fromEntries(formData.entries());

    sendRegisterJson(formJSON);
}

const sendRegisterJson = async (userJson) => {
    const res = await fetch("http://www.localhost:3000/api/tecs/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userJson)
    });
    const resJSON = await res.json();

    console.log(resJSON);
    showMessage(resJSON.message);
    formularioRegistro.reset();
}


formularioRegistro.addEventListener("submit", registerUser);