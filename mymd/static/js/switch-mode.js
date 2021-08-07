export default class Switch_mode {
    constructor() {
        this.model = null;
        this.nigthMode = false;
        this.btnMode = document.querySelector("#switch-mode");
        //This function will update the view, change the swich view and save the bool value on localstorage
        this.btnMode.addEventListener("click", () => {
            this.updateMode();
            this.changeSwitch();
            this.changeMode();
        });

        this.storageIndex = null;
    }

    setModel(model) {
        this.model = model;

        this.nigthMode = () => this.model.getElement(["style"]).nigthMode;
        this.changeSwitch();
        this.changeMode();
    }

    // Changes the swich appearance
    changeSwitch() {
        if (this.nigthMode() === true) {
            this.btnMode.classList.add("active");
        } else {
            this.btnMode.classList.remove("active");
        }
    }

    // Updates the view mode
    changeMode() {
        if (this.nigthMode() === true) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }

    // Updates the value from local storage
    updateMode() {
        this.model.updateElement(
            ["style"],
            { nigthMode: !this.nigthMode() },
            "assign"
        );
    }
}
