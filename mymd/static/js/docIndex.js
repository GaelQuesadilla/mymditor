import Switch_mode from "./switch-mode.js";
import Model from "./model.js";
import Urls from "./urls.js";
import View from "./docView.js";
import Edit from "./docEdit.js";
import Ajax from "./ajaxModel.js";

document.addEventListener("DOMContentLoaded", function () {
    // Set all requeriments of "/docs/view" view
    const switchMode = new Switch_mode();
    const model = new Model();
    const urls = new Urls();
    const view = new View();
    const edit = new Edit();
    const ajax = new Ajax

    switchMode.setModel(model);

    view.setModel(model);
    view.setUrls(urls);
    view.setAjax(ajax)

    view.render();
});
