import Switch_mode from "./switch-mode.js";
import Model from "./model.js";

document.addEventListener("DOMContentLoaded", function () {
    // Set all requirements of "/logout" view
    const model = new Model();
    model.storage = null;
    model.save();
    const switchMode = new Switch_mode();
    switchMode.setModel(model);
});
