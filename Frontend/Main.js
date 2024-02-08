import "./Style.css";

import FormContact from "./Modules/FormContact";
import FormLogin from "./Modules/FormLogin";
import MenuPage from "./Modules/MenuPage";
import AlertMgs from "./Modules/AlertMgs";

const form__Contact = new FormContact(".container__Contact");
const form__Login = new FormLogin(".container__Form");
const menu__Pages = new MenuPage(".dropdown");
const alert__Msg = new AlertMgs(".container");