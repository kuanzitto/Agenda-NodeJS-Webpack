require("dotenv").config();

//Require's
const Path = require("path");
const Express = require("express");
const Mongoose = require("mongoose");
const FlashMsg = require("connect-flash");
const Sessions = require("express-session");
const MongoStore = require("connect-mongo");


//Active Express Function
const Server = Express();


//Imported Routes | Middles
const Routers = require("./Routes");
const { MiddleGlobal } = require("./Middlewares/MiddleGlobal");


//Created Session Cofig
const session__Config = Sessions({
    secret: process.env.PASSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true,
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECBASE })
});


//Creted Session DataBase
const connect__DataBase =  async () => {
    try {
        await Mongoose.connect(process.env.CONNECBASE);
        Server.emit("Running");
    } catch (e) {
        console.log(e);
    }
}

connect__DataBase();


//Active LocalHost
Server.on("Running", ()=>
    Server.listen(3000, ()=>
        console.log("http://localhost:3000")
));


// Use | Set Atributtes
Server.use(FlashMsg());
Server.use(session__Config);

Server.set("views", Path.resolve(__dirname, "Views"));
Server.set("view engine", "ejs");

Server.use(Express.static("Public"));
Server.use(Express.urlencoded({ extended: true }));

Server.use(MiddleGlobal);
Server.use(Routers);