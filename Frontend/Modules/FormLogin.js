import Validator from "validator";

export default class FormLogin {
    constructor(FormLogin){
        this.form__Login = document.querySelector(FormLogin);
        this.errors = [];
        this.form__Events();
    }
    
    form__Events = () => {
        if(!this.form__Login) return;
        this.form__Login.addEventListener("submit", (e) => {
            e.preventDefault();

            const element = e.target;

            const input__Email = element.querySelector("input[name=email]");
            const input__senha = element.querySelector("input[name=senha]");
            const Errors = element.querySelectorAll("p[name *= errors]");

            this.validate__InputEmpty(input__Email, Errors[0]);  
            this.validate__InputEmpty(input__senha, Errors[1]);

            if(input__Email.classList.contains("flag__Error")) return;
            
            this.validate__Password(input__senha, Errors[1]);
            this.validate__Email(input__Email, Errors[0]);

            if(input__Email.classList.contains("flag__Error")) return;
            if(input__senha.classList.contains("flag__Error")) return;

            element.submit();
            return;

        });
    }

    validate__Password = (senha, msgError) => {
        console.log(senha.value.length);
        const isPass = (senha.value.length < 4);
        senha.classList.toggle("flag__Error", isPass);

        return msgError.innerHTML = isPass ? "* A senha deve ter entre 4 e 40 caracteres." : "⠀"; 
    }

    validate__Email = (email, msgError) => {
        const isMail = (!Validator.isEmail(email.value));
        email.classList.toggle("flag__Error", isMail);

        return msgError.innerHTML = isMail ? "* O E-mail informado é inválido! " : "⠀";
    }

    validate__InputEmpty = (input, msgError) => {
        const isEmpty = input.value === "";
        input.classList.toggle("flag__Error", isEmpty);

        return msgError.innerHTML = isEmpty ? "* Preencha os campos para logar!" : "⠀";
    }
}

