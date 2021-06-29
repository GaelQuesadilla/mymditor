import Switch_mode from "./switch-mode.js";
import Model from "./model.js";
import Views from "./indexViews.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Dom content loaded");
    const switchMode = new Switch_mode();
    const model = new Model();
    const views = new Views();

    switchMode.setModel(model);
    views.setModel(model);
});
