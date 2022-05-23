import { UserService } from '../services/UserService.js'
import { FormHandler } from '../handlers/FormHandler.js'
import { AuthHandler } from '../handlers/AuthHandler.js';
import { WarningHandler } from '../handlers/WarningHandler.js';


const goRegister = document.getElementById("optionRegister");
const closeModalButton = document.getElementById("fechar_modal");
const formLogin = document.getElementById("form_Login");
const form = document.getElementById("form_Cadastro");


goRegister.addEventListener("click", () => {
    const modal = document.getElementById("modal_cadastro");
    modal.classList.add("show");
});



closeModalButton.addEventListener("click", () => {
    const modal = document.getElementById("modal_cadastro");
    modal.classList.remove("show");
});


const formCadastroHandler = new FormHandler(form);
const formLoginHandler = new FormHandler(formLogin)

form.addEventListener('submit', async(e) => {
    if (formCadastroHandler.handleSubmit(e)) {
        const data = FormHandler.receiveData(e);

        WarningHandler.clearWarnings()
        if (await AuthHandler.register(data)) {
            AuthHandler.login(data)
            WarningHandler.showWarning('Usuário cadastrado com sucesso', false)

            setTimeout(() => {
                window.location.href = '../../index.html'
            }, 2000)
        } else {
            WarningHandler.showWarning("Usuário já existente!")
        }

    }
})

formLogin.addEventListener('submit', async(e) => {
    if (formLoginHandler.handleSubmit(e)) {
        const dados = FormHandler.receiveData(e);

        WarningHandler.clearWarnings()
        if (await AuthHandler.login(dados)) {
            window.location.href = "../../index.html"

        } else {
            WarningHandler.showWarning("Email e/ou senha incorretos!")
        }

    }
})