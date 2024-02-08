const { Register } = require("../Models/RegisterModel");

const PageRegister = (req, resp) => {
    resp.render("PageRegister");
}

const PostPageRegister = async (req, resp) => {
    try {
        if(!req.body) return;

        const Reg = new Register(req.body);
        await Reg.validate__Regs();

        if(Reg.errors.length > 0) {
            req.flash("errors", Reg.errors);
            req.session.save(()=> resp.redirect("/cadastrar"));
            return;
        }

        req.flash("sucess", "Usuário criado com sucesso :)");
        req.session.save(()=>resp.redirect("/login"));
        return;
    } catch (e) {
        console.log(e);
    }
}


module.exports = { PageRegister, PostPageRegister }