const Mongoose = require("mongoose");
const Validate = require("validator");
const Login = require("../Models/LoginModel");

const ContactSchema = new Mongoose.Schema({
    id: { type: String, required: false },
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false },
    telefone: { type: String, required: true },
    email: { type: String, required: true },
});

const ContactModel = new Mongoose.model("Contatos", ContactSchema);


class Contact {
    constructor(userContact, userID){
        this.data = userContact;
        this.userID = userID;
        this.errors = [];
        this.user = null;
    }

    validate__Conct = async () => {

        this.verify__Errors();
        if(this.errors.length > 0) return;

        await this.check__ConctBase();
        if(this.errors.length > 0) return;

        this.user = await ContactModel.create(this.data);
    }

    check__ConctBase = async () => {
        this.user = await ContactModel.findOne({ email: this.data.email, telefone: this.data.telefone });
        if(this.user) return this.errors.push("Esse contato já está cadastrado!");
    }

    verify__Errors = () => {
        this.data = {
            id: this.userID,
            nome: this.data.nome,
            sobrenome: this.data.sobrenome,
            telefone: this.data.telefone,
            email: this.data.email,
        }

        for(const key in this.data){
            if(typeof this.data[key] !== "string") return this.data = "";
        }

        if(!Validate.isEmail(this.data.email)) return this.errors.push("Email inválido!");
        if(this.data.nome === "" || this.data.telefone === "" || this.data.telefone.length < 14) 
            return this.errors.push("O contato requer pelo menos 3 campos preenchidos!");
    }

    search__ConctList = async (id) => {
        this.user = await ContactModel.find({ id: id });
        return this.user;
    }

    get__UserId = async (id) => {
        this.userID = await ContactModel.findById(id);
        return this.userID;
    }

    UpdateConctBase = async (id) => {
        this.verify__Errors();
        if(this.errors.length > 0) return;

        this.user = await ContactModel.findByIdAndUpdate(id, this.data, { new: true });
        return this.user;
    }

    DeletContactBase = async (deletID) => {
        return this.user = await ContactModel.deleteOne({ _id: deletID });
        
    }
}

module.exports = Contact;




    