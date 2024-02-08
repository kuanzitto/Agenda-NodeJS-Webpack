export default class MenuPage {
    constructor(MenuDown){
        this.drop = document.querySelector(MenuDown);
        this.menu__EventDrop();
    }

    menu__EventDrop = () => {
        this.drop.addEventListener("click", ()=>{
            this.drop.classList.toggle("active");
        });
    }
}