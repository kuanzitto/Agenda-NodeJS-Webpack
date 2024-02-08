const { RegModel } = require("../Models/RegisterModel");
const Validator = require("validator");
const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt");


class Login {
    constructor(logUser){
        this.data = logUser;
        this.errors = [];
        this.user = null;
    }

    validate__Log = async () => {
        
        this.verify__Errors();
        if(this.errors.length > 0) return;
        
        await this.check__ExistUserBase();
        if(this.errors.length > 0) return;


        this.user = Bcrypt.compareSync(this.data.senha, this.user.senha);
        if(!this.user) return this.errors.push("Usuário inválido!");
    }

    check__ExistUserBase = async () => {
        this.user = await RegModel.findOne({ email: this.data.email });
        if(!this.user) return this.errors.push("Usuário não existe!");
        return this.user;
    }
    
    verify__Errors = () => {
        this.data = { email: this.data.email, senha: this.data.senha }

        for(const key in this.data) {
            if(typeof this.data[key] !== 'string') return this.data = ""; 
        }

        if(!Validator.isEmail(this.data.email)) return this.errors.push("O Email informado é inválido!");
        if(this.data.senha.length < 4 || this.data.senha.lengh > 40) {
            return this.errors.push("Senha inválida!");
        }
    }
}


module.exports = Login;