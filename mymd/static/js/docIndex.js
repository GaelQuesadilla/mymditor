import Switch_mode from "./switch-mode.js";
import Model from "./model.js";
import Urls from "./urls.js";
import View from "./docView.js";
import Edit from "./docEdit.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Dom content loaded");
    const switchMode = new Switch_mode();
    const model = new Model();
    const urls = new Urls();
    const view = new View();
    const edit = new Edit();

    switchMode.setModel(model);

    view.setModel(model);
    view.setUrls(urls);

    view.render();
});
