const Contact = require("../Models/ContactModel");

const PageHome = async (req, resp) => {
    try {   
        let contato = [];
        if(req.params.id) {
            const Conct = new Contact();
            contato = await Conct.search__ConctList(req.session.user._id);
        }

        resp.render("PageHome", { contato });
    } catch(e) {
        console.log(e);
    }
};

const PageLogout = (req, resp) => {
    try {
        req.session.destroy(()=> resp.redirect("/"));
        return;
    } catch (e) {
        console.log(e);
    }   
}

module.exports = { PageHome, PageLogout };