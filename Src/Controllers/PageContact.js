const Contact = require("../Models/ContactModel");

const PageContact = (req, resp) => {
    resp.render("PageContact");
}

const PostPageContact = async (req, resp) => {
    try {
        if(!req.body) return;
        
        const Conct = new Contact(req.body, req.session.user._id);
        await Conct.validate__Conct();
    
        if(Conct.errors.length > 0) {
            req.flash("errors", Conct.errors);
            req.session.save(()=> resp.redirect("/contato"));
            return;
        }
    
        req.flash("sucess", "Contato criado com sucesso :)");
        req.session.save(()=> resp.redirect(`/${req.params.id}`));
        return;
        
    } catch (e) {
        console.log(e);
    }
}

const SeachContactId = async (req, resp) => {
    try {
        if(!req.params.id) return;
        const Conct = new Contact();
        const ConctEdit = await Conct.get__UserId(req.params.id);
        
        return resp.render("PageEditContact", { ConctEdit });
    } catch (e) {
        console.log(e);
    }
}

const UpdateContact = async (req, resp) => {
    try {
        const ConctEdited = new Contact(req.body, req.session.user._id);
        await ConctEdited.UpdateConctBase(req.params.id);

        if(ConctEdited.errors.length > 0) {
            req.flash("errors", ConctEdited.errors);
            req.session.save();
            return;
        }

        req.flash("sucess", "Contato editado com sucesso :)");
        req.session.save(()=> resp.redirect(`/${req.session.user._id}`));
        return;
    } catch(e) {
        console.log(e);
    }
}

const DeleteContact = async (req, resp) => {
    try {
        const DeletConct = new Contact();
        await DeletConct.DeletContactBase(req.params.id);

        req.flash("sucess", "Contato deletado com sucesso!");
        req.session.save(()=> resp.redirect(`/${req.session.user._id}`));
    } catch(e) {
        console.log(e);
    }
}


module.exports = { PageContact, PostPageContact, SeachContactId, UpdateContact, DeleteContact };
