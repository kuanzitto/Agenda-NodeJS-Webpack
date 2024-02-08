const Express = require("express");
const Routers = Express.Router();

//Controllers

const { PageHome } = require("./Controllers/PageHome");
const { PageLogin } = require("./Controllers/PageLogin");
const { PageLogout } = require("./Controllers/PageHome");
const { PageContact } = require("./Controllers/PageContact");
const { PostPageLogin } = require("./Controllers/PageLogin");
const { PageRegister } = require("./Controllers/PageRegister");
const { PostPageContact } = require("./Controllers/PageContact");
const { PostPageRegister } = require("./Controllers/PageRegister");
const { SeachContactId } = require("./Controllers/PageContact");
const { UpdateContact } = require("./Controllers/PageContact");
const { DeleteContact } = require("./Controllers/PageContact");

//Middles

const { MiddleLogin } = require("./Middlewares/MiddleGlobal");

//Usuário não logado:
Routers.get("/login", PageLogin);
Routers.post("/login/logado", PostPageLogin);

Routers.get("/cadastrar", PageRegister);
Routers.post("/cadastrar/registrado", PostPageRegister);


//Usuário Logado:

Routers.get("/:id?", PageHome);

Routers.get("/:id/contato", MiddleLogin, PageContact);
Routers.post("/contato/:id/criado", MiddleLogin, PostPageContact);

Routers.get("/:id/logout", MiddleLogin, PageLogout);

Routers.get("/editar/:id", MiddleLogin, SeachContactId);
Routers.get("/deletar/:id", MiddleLogin, DeleteContact);
Routers.post("/:id/editar/editado/:id", MiddleLogin, UpdateContact);




module.exports = Routers;