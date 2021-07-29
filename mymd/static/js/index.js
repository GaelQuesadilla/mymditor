import Switch_mode from "./switch-mode.js";
import Model from "./model.js";
import Views from "./indexViews.js";
import Urls from "./urls.js";
import Ajax from "./ajaxModel.js";

document.addEventListener("DOMContentLoaded", function () {
    // Set all requeriments of "/" view
    console.log("Dom content loaded");
    const switchMode = new Switch_mode();
    const model = new Model();
    const views = new Views();
    const urls = new Urls();
    const ajax = new Ajax();

    switchMode.setModel(model);
    views.setModel(model);
    views.setUrls(urls);
    views.setAjax(ajax);

    views.render();
});
