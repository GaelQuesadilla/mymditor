import Alerts from "./alerts.js";
export default class Views {
    constructor() {
        this.model = null;
        this.ajax = null;
        this.urls = null;
        this.switchMode = null;
        this.alerts = new Alerts();

        this.content = document.querySelector("#content");
        this.docsContainer = document.querySelector("#docsContainer");
        this.modalAlert = document.querySelector("#addDocModal .alert");
        this.pageAlerts = document.querySelector("#pageAlerts");

        // this modal displays for add an element
        this.addDocModal = document.querySelector("#addDocModal");
        // This variable should save csrf_token value
        this.csrf_token = document.querySelector(
            "input[name=csrfmiddlewaretoken]"
        ).value;

        this.addDocBtn = document.querySelector("#addDocConfirmation");
        //  This function try to add an element in local storage, after the element will be added on the view
        this.addDocBtn.addEventListener("click", () => {
            const values = this.getValues();
            if (values == null || Object.keys(values)[0].length <= 0) {
                // -> Alert
                this.modalAlert.classList = "alert red";
                this.modalAlert.innerHTML = "Invalid values";
            } else {
                const addedDoc = this.model.updateElement(
                    ["documents", "value"],
                    values,
                    "push"
                );
                // model.updateElement() return null when errors doesn't happen
                if (addedDoc == null) {
                    this.addElement(values);

                    // -> Alert
                    this.modalAlert.classList = "alert green";
                    this.modalAlert.innerHTML = "Element added";
                } else {
                    // -> Alert
                    this.modalAlert.classList = "alert red";
                    this.modalAlert.innerHTML = addedDoc;
                }
            }
        });

        this.downloadBtn = document.querySelector(
            "#downloadElementsContainer span a i"
        );
        // This function will get csrf_token and use "downloadElements()" method
        this.downloadBtn.addEventListener("click", () =>
            this.downloadElements([""])
        );

        this.uploadBtn = document.querySelector(
            "#uploadElementsContainer span a i"
        );
        // This function will get csrf_token and values, then use "uploadElements()" method
        this.uploadBtn.addEventListener("click", () =>
            this.uploadElements([""], {
                value: this.model.getElement([""]),
            })
        );

        //  This function will close the add doc modal
        document
            .querySelector("#closeDocModal")
            .addEventListener("click", () => this.closeModal(this.addDocModal));

        //  This function will open the add doc modal
        document
            .querySelector("#addElementContainer span a i")
            .addEventListener("click", () => this.openModal(this.addDocModal));

        console.log("a");
    }

    setModel(model) {
        this.model = model;
    }

    setUrls(urls) {
        this.urls = urls;
    }

    setAjax(ajax) {
        this.ajax = ajax;
    }

    setSwitchMode(switchMode) {
        this.switchMode = switchMode;
    }

    // This method will download all the user documents from server
    // dir should be an array with keys and csrf token should be an string with csrf_token value
    downloadElements(index) {
        const downloadPromise = this.ajax.download(index, this.csrf_token);
        // Alert
        this.alerts.pageAlert(
            this.pageAlerts,
            "<p>Downloading</p><span class='spinner'></span>",
            "alert white",
            downloadPromise
        );
        // Wait for promise response and then update documents and render
        downloadPromise.then((response) => {
            // Alert
            this.alerts.pageAlert(
                this.pageAlerts,
                "<p>All elements downloaded</p>",
                "alert white"
            );

            this.model.updateElement([""], response.data, "assign");
            this.switchMode.changeMode();
            this.switchMode.changeSwitch();
            this.render();
        });
    }

    // This method will upload and update all the user documents from server
    // dir should be an array with keys and csrf token should be an string with csrf_token value
    uploadElements(index, data, csrf_token) {
        const uploadPromise = this.ajax.upload(index, data, this.csrf_token);
        // Alert
        this.alerts.pageAlert(
            this.pageAlerts,
            "<p>Updating</p><span class='spinner'></span>",
            "alert white",
            uploadPromise
        );
        //Wait for promise response and then print the response
        // Alert
        uploadPromise.then((response) =>
            this.alerts.pageAlert(
                this.pageAlerts,
                "<p>Updated</p>",
                "alert white"
            )
        );
    }

    // This method only add an element on the view with values specified on the values object
    addElement(values) {
        const title = Object.keys(values)[0];
        const docUrlSearch = this.urls.createSearch("view", {
            docName: title,
        });
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="element">
            <span class="element__option">
                <a href="docs/${docUrlSearch}">
                    <i class="fas fa-file"></i>
                </a>
            </span>
            <div class="element__title">${title}</div>
        </div>`;

        this.docsContainer.appendChild(element);
    }

    // This method will create and return a new object with user´s input
    getValues() {
        const input = this.addDocModal.querySelector("#addDocTitle");
        let values = {};
        values[input.value] = { value: "" };

        return values;
    }

    openModal(modal) {
        modal.classList.remove("d-none");
    }

    closeModal(modal) {
        this.modalAlert.classList.add("d-none");
        modal.classList.add("d-none");
    }

    // This method shuld be used when the dom content load
    // get all documents from local storage and add all documents on the view
    render() {
        this.docsContainer.innerHTML = "";
        const docs = this.model.getElement(["documents", "value"]);
        for (let values in docs) {
            let element = {};
            element[values] = docs[values];
            this.addElement(element);
        }
    }
}
