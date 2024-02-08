import Validator from "validator";


export default class FormContact {
    constructor(conctForm){
        this.contac__Form = document.querySelector(conctForm);
        this.form__Events();
    }

    form__Events = () => {
        if(!this.contac__Form) return;
        this.form__Load();

        this.contac__Form.addEventListener("submit", e => {
            e.preventDefault();
            const element = e.target;

            const Errors = element.querySelectorAll("p[name *= errors]");
            const input__Nome = element.querySelector("input[ name = nome ]");
            const input__Sobre = element.querySelector("input[ name = sobrenome ]");
            const input__Email = element.querySelector("input[ name = email ]");
            const input__Phone = element.querySelector("input[ name = telefone ]");

            this.validate__InputEmpty(input__Nome, Errors[0]);  
            this.validate__InputEmpty(input__Sobre, Errors[1]);
            this.validate__InputEmpty(input__Email, Errors[2]);
            this.validate__InputEmpty(input__Phone, Errors[3]);
            
            if(input__Phone.classList.contains("flag__Error") & input__Email.classList.contains("flag__Error")
                && input__Nome.classList.contains("flag__Error")) return;

            this.validate__Email(input__Email, Errors[2]);
            this.format__ConctNumber(input__Phone, Errors[3]);    
            if(input__Email.classList.contains("flag__Error") && input__Phone.classList.contains("flag__Error")) return; 
            

            element.submit();
            return;
        })
    }
    
    form__Load = () => {
        this.contac__Form.addEventListener("input", e => {
            const element = e.target;

            const Errors = this.contac__Form.querySelectorAll("p[ name *= errors ]");

            if(element.name === "telefone") {
                this.input__Phone = this.format__ConctNumber(element, Errors[3]);
                return element.value = this.input__Phone;
            }

            if(element.name === "email") {
                this.input__Mail = element;
                return this.validate__Email(this.input__Mail, Errors[2]);
            }
            
        });
    }

    validate__Email = (email, msgError) => {
        const isMailFormat = (!Validator.isEmail(email.value));
        email.classList.toggle("flag__Error", isMailFormat);

        return msgError.innerHTML = isMailFormat ? "* O E-mail informado é inválido! " : "⠀";
    }

    validate__InputEmpty = (input, msgError) => {
        const isEmpty = input.value === "";
        input.classList.toggle("flag__Error", isEmpty);

        return msgError.innerHTML = isEmpty ? "* Preencha os campos para logar!" : "⠀";
    }

    format__ConctNumber = (conctNumber, msgError) => {
        const IsNumberFormat = conctNumber.value.length < 14;
        conctNumber.classList.toggle("flag__Error", IsNumberFormat);
        
        msgError.innerHTML = IsNumberFormat ? "* Telefone inválido! " : "⠀";
        return conctNumber.value.replace(/(\D)/g, "")
        .replace(/(\d{2})/, '($1)')
        .replace(/(\d{5})/, '$1-');
        
    } 
}

