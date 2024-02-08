const Login = require("../Models/LoginModel");

const PageLogin = (req, resp) => {
    resp.render("PageLogin");
}

const PostPageLogin = async (req, resp) => {
    try {
        if(!req.body) return;

        const Log = new Login(req.body);
        await Log.validate__Log();
        
        if(Log.errors.length > 0){
            req.flash("errors", Log.errors);
            req.session.save(()=> resp.redirect("/login"));
            return;
        }
        
        const userID = await Log.check__ExistUserBase();
        req.flash("sucess", "Usuário logado com sucesso :)");
        req.session.userID = userID;
        req.session.user = Log.user;
        req.session.save(() => resp.redirect(`/${userID._id}`));
        return;    
    } catch (e) {
        console.log(e);
    }
    
}


module.exports = { PageLogin, PostPageLogin };