export default class Switch_mode {
    constructor() {
        this.btnMode = document.querySelector("#switch-mode");
        this.btnMode.addEventListener("click", () => {
            this.changeSwitch();
            this.changeMode();
        });
    }

    changeSwitch() {
        this.btnMode.classList.toggle("active");
        document.body.classList.toggle("dark");
    }

    changeMode() {}
}
