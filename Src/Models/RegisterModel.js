const Mongoose = require("mongoose");
const Validator = require("validator");
const Bcrypt = require("bcrypt");


const RegSchema = new Mongoose.Schema({
    email: { type: String, required: "true" },
    senha: { type: String, required: "true" },
    registradoEm: { type: Date, default: Date.now }
});

const RegModel = new Mongoose.model("Cadastros", RegSchema);

class Register {
    constructor(regData){
        this.data = regData;
        this.errors = [];
        this.user = null;
    }

    validate__Regs = async () => {

        this.verify__Errors();
        if(this.errors.length > 0) return;
        
        await this.check__UserNew();
        if(this.errors.length > 0) return;
        
        this.data.senha = Bcrypt.hashSync(this.data.senha, Math.floor(Math.random()));
        this.user = await RegModel.create(this.data);
    }

    check__UserNew = async () => {
        this.user = await RegModel.findOne({ email: this.data.email });
        if(this.user) return this.errors.push("Usuário já cadastrado!");
    }

    verify__Errors = () => {
        this.data = { email: this.data.email, senha: this.data.senha }

        for(const key in this.data){
            if(typeof this.data[key] !== "string") { 
                return this.data = "";
            }
        }

        if(!Validator.isEmail(this.data.email)) return this.errors.push("O Email informado é inválido!");
        if(this.data.senha.length < 4 || this.data.senha.length > 40) {
             return this.errors.push("Senha inválida!");
        }
    }
}

module.exports = { Register, RegModel };