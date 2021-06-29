export default class Switch_mode {
    constructor() {
        this.model = null;
        this.nigthMode = false;
        this.btnMode = document.querySelector("#switch-mode");
        this.btnMode.addEventListener("click", () => {
            this.updateMode();
            this.changeSwitch();
            this.changeMode();
        });

        this.storageIndex = null;
    }

    setModel(model) {
        this.model = model;

        this.storageIndex = this.model.findElement("nigthMode");
        this.nigthMode = this.model.getElement(this.storageIndex).value;
        this.changeSwitch();
        this.changeMode();
    }

    changeSwitch() {
        if (this.nigthMode === true) {
            this.btnMode.classList.add("active");
        } else {
            this.btnMode.classList.remove("active");
        }
    }

    changeMode() {
        if (this.nigthMode === true) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
    updateMode() {
        this.nigthMode = !this.nigthMode;
        this.model.updateElement(this.storageIndex, { value: this.nigthMode });
    }
}
