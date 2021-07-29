import Switch_mode from "./switch-mode.js";
import Model from "./model.js";

document.addEventListener("DOMContentLoaded", function () {
    // Set all requeriments for a basic view

    console.log("Dom content loaded");
    const switchMode = new Switch_mode();
    const model = new Model();

    switchMode.setModel(model);
});
