import Switch_mode from "./switch-mode.js";
import Model from "./model.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("loaded");
    const switchMode = new Switch_mode();
    const model = new Model();

    switchMode.setModel(model);
});
