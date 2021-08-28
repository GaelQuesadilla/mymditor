export default class Switch_mode {
    constructor() {
        this.model = null;
        this.nightMode = false;
        this.btnMode = document.querySelector("#switch-mode");
        //This function will update the view, change the switch view and save the bool value on local storage
        this.btnMode.addEventListener("click", () => {
            this.updateMode();
            this.changeSwitch();
            this.changeMode();
        });

        this.storageIndex = null;
    }

    setModel(model) {
        this.model = model;

        this.nightMode = () => this.model.getElement(["style"]).nightMode;
        this.changeSwitch();
        this.changeMode();
    }

    // Changes the switch appearance
    changeSwitch() {
        if (this.nightMode() === true) {
            this.btnMode.classList.add("active");
        } else {
            this.btnMode.classList.remove("active");
        }
    }

    // Updates the view mode
    changeMode() {
        if (this.nightMode() === true) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }

    // Updates the value from local storage
    updateMode() {
        this.model.updateElement(
            ["style"],
            { nightMode: !this.nightMode() },
            "assign"
        );
    }
}
