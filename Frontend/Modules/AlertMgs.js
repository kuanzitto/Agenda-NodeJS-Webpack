export default class AlertMgs {
    constructor(AlertMsg){
        this.alert__Mgs = document.querySelector(AlertMsg);
        this.alert__Events();
    }

    alert__Events = () => {
        if(!this.alert__Mgs) return;
        this.alert__Mgs.addEventListener("click", (e) => {
            const element = e.target;

            if(!element.name || !element.class === "continue") return;
            if(!element.name || !element.class === "tryagain") return;

            return this.alert__Mgs.classList.toggle("bnt__Event");
        });
    }
}